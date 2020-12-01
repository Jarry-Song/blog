# Room组件架构原理解析 

## 前言
Android应用数据存储简单来说有这么几种：文件存储、SharePreference存储、SQLite数据库存储。如果需要存储的数据量大的时候，那么使用文件存储会有很大的弊端，例如：你想修改其中很微小的项就要先读取整个文件的内容，修改后再全部保存，非常耗时。SharePreference大多数用来存储键值对形式的少量数据。所以SQLite数据库存储使用的场景还是非常高的，但是到目前Android10.0为止，原生的SQLite都不是那么友好，使得我们不得不经常引入其他三方ORM库。因为在Jetpack的架构下，Room数据库组件顺势而生。

## 提纲
- 什么是Room
- Room的高频用法
- Room数据库创建实现原理
- Room与LiveData的巧妙结合，数据变更监听

## 什么是Room？

Room是一个轻量级ORM数据库，本质上是一个SQLite抽象层，但是使用起来会更加简单，类似于Retrofit库。Room在开发阶段通过注解的方式标记相关功能，编译时自动生成响应的impl实现类。

而且编译阶段会有丰富的语法校验，错误提示。相比如直接使用SQLite来创建数据库，来操作数据，实在是方便的太多了。带回咱们会手写来感受一下，Room是如何创建数据库的。

我们对一个ORM数据库的要求不仅仅要简单好用，足够的检验，丰富的错误提示。它的性能我们应该更加关注。这里引用的一张图展示了GreenDAO，ORMLite，Room三者执行insert、update、query三种操作时的耗时对比。

很明显，三项测试红色的Room好使都比其他两者低。由于Room是对原生SQLite的封装，所以它的性能几乎和SQLite相当，如果你的APP不是像微信这种级别的数据存储要求，那么Room是够用了的。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128221326.png)

## Room高频用法

在开始学习Room数据库之前先来回忆一下直接使用SQLite该怎么创建一个数据库出来，以及它现在存在的问题。

从下面这段代码上我们可以发现直接使用SQLite创建数据库存在以下三个比较明显的问题：

```kotlin
//表名、列名
const val TABLE_NAME = "table_cache"
const val COLUMN_NAME_KEY = "cache_key"
const val COLUMN_NAME_DATA = "cache_data"

//建表 SQL，是不是很容易犯错，如果使用Java就更容易犯错了
//即使你说这些我信手拈来，但是依然很繁琐
private const val SQL_CREATE_TABLE_CACHE =
        "CREATE TABLE $TABLE_NAME (" +
                "$ID INTEGER PRIMARY KEY," +
                "$COLUMN_NAME_TITLE TEXT," +
                "$COLUMN_NAME_SUBTITLE TEXT)"

class CacheDbHelper(context: Context) : SQLiteOpenHelper(context,     DATABASE_NAME, null, DATABASE_VERSION) {
    companion object {
        const val DATABASE_VERSION = 1
        const val DATABASE_NAME = "cache.db"
    }

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(SQL_CREATE_TABLE_CACHE)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        //根据oldVersion和newVersion编写相应的SQL语句对数据库进行升级 
        //在实际应用中，这是比较难处理的一部分，因为缺少必要的验证，极容易出错
  }

    //基类中包含了两个重要的方法 getWritableDatabase() 和   getReadableDatabase()
    //这是我们操作数据库的入口
}

```
- SQL语句的正确性及安全性都没有保证，问题被延迟到了运行时才能被发现；
- 极容易在主线程对数据库进行操作；
- 从数据库数据到我们所需要的类数据之间的转换繁琐。

那么使用Room创建数据库呢，下面我们来看下Room是如何创建数据库的。

Room数据库创建三部曲：

**1.首先仍是添加依赖：**

```java
implementation "androidx.room:room-runtime:2.2.5"
kapt "androidx.room:room-compiler:2.2.5"
```
**2.创建Room数据库必备三大件**

- **@Entity：** 表示数据库中的标；
- **@DAO：** 数据操作对象；
- **@Database数据库：** 必须是扩展RoomDatabase的抽象类。在注解中添加与数据库关联的数据表。包含使用@Dao注解标记的类的抽象方法。

### 第一步，定义数据库的表

```kotlin
//定义表非常简单，只需要创建一个class ,并标记上Entity注解,可以使用它的`tableName`属性声明该表的名称
  @Entity(tableName = "table_cache")
  class Cache {
    //1.）对于一个表来说，他必须存在一个不为空的主键 也就是必须要标记PrimaryKey和NonNull两个注解
    //PrimaryKey注解的`autoGenerate`属性意味该主键的值，是否由数据库自动生成
    //由于我们这里是字符串的主键key，所以我们想要自己指定他得值，
    //如果是Long,INT类型的主键key，可以选择由数据库自动生成
    @PrimaryKey(autoGenerate = false) 
    @NonNull
    var key: String = ""
    
    //2.）该字段在数据库表中的列名称，不指定的默认就等于该字段的名字
    @ColumnInfo(name="cache_data",defaultValue = "default value")
    var data: String? = null
    
    //3.)如果不想让该字段映射成表的列，可以使用该注解标记
    @Ignore
    var timeStamp:Long?=null
    
    //4.) 如果想让内嵌对象中的字段也一同映射成 数据库表的字段，可以使用Embedded注解。此时User对象中所有字段也会一同出现在cache表中
    //他又要求 User 对象必须也使用Entity注解标记，并且拥有一个不为空的主键才可以   
    @Embedded
    var user: User? = null
    
     //5.)对于一个Room数据库的表而言，还有很多其他注解和属性可以使用，诸如索引，外键，关系数据支持的特性room都支持。但对于客户端来说一般也用不到，以上这些就够用了。
  }
```

### 第二步，定义数据库数据操作对象

```kotlin
@Dao    全称(data access object)
  interface CacheDao {
    //1.）如果是插入数据,只需要标记上Insert注解，并指明插入数据时如果已存在一条主键一样的数据，执行什么策略
    //REPLACE: 直接替换老数据
    //ABORT:终止操作，并回滚事务，也就是老数据不影响
    //IGNORE:忽略冲突，但是会插入失败
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun saveCache(cache: Cache): Long
    
    //2.)常规查询操作，此时还是需要你写sql语句的
    @Query("select * from table_cache where `key`=:primaryKey")
    fun getCache(primaryKey: String): Cache?  
   
     //3.) 高级查询操作，可以通过livedata 以观察者的形式获取数据库数据，可以避免不必要的npe
         //更重要的是 他可以监听数据库表中的数据的比变化。一旦发生了 insert update delete。
         //room会自动读取表中最新的数据，发送给UI层 刷新页面
         //这一点是我们着重要关注的，看它背后有什么骚操作。
    @Query("select * from table_cache")
    fun query2(): LiveData<List<Cache>>  //rxjava observer 也是支持的

   //4.）删除操作非常简单 ，也可以执行sql的删除数据
    @Delete(entity = Cache::class)
    fun deleteCache(key: String)

    //5.) 更新操作，也非常简单，表中对应的这一行所有数据会被替换成Cache对象的字段值
    @Update()
     fun update(cache: Cache)
  }
```

### 第三步，定义数据库，并关联上标和数据操作实体

```kotlin
// TypeConverters用以声明该数据库支持的类型转换，比如下面定义的DateConvert里面就定义Date类型的字段，存储数据库的时候会被转换成Long, 而该字段被读取的时候，会被转换成Date类型
    @TypeConverters(DateConvert::class) 
    @Database(entities = [Cache::class], version = 1)
    abstract class CacheDatabase : RoomDatabase() {
      //1）.创建内存数据库,也就是说这种数据库当中存储的数据，只会存留在内存当中，进程被杀死之后，数据随之丢失
      
       val database=  Room.inMemoryDatabaseBuilder(context,CacheDatabase::class.java).build()
       //2）.创建本地持久化的数据库
       val database = Room.databaseBuilder(context, CacheDatabase::class.java, "howow_cache").
                           //是否允许在主线程上操作数据库，默认false。
                           //相比sqlite无明文禁止即可为来说，Room给出了规范
                          .allowMainThreadQueries()
                          //数据库创建和打开的事件会回调到这里，可以再次操作数据库
                          .addCallback(callback)
                          //指定数据查询数据时候的线程池,
                          .setQueryExecutor(cacheThreadPool)
                          //它是用来创建supportsqliteopenhelper
                          //可以利用它实现自定义的sqliteOpenHelper，来实现数据库的加密存储，默认是不加密的
                         .openHelperFactory()
                         //数据库升级 1---2
                         .addMigrations(migration1_2)
                         
   //3）. 以抽象方法的形式声明数据操作对象Dao
   kotlin  abstract val cacheDao: CacheDao
      
   //这里演示下数据库从version1->version2的升级过程
   //注意，一旦数据库被创建，只要任意对象的任意字段有改动
   //Database注解的version字段都需要升级，同时需要指定升级的行为migration。
   val migration1_2 = object :Migration(1,2){
            override fun migrate(database: SupportSQLiteDatabase) {
                database.execSQL("alter table table_cache add column cache_time LONG")
            }
        }
    }

  class DateConvert {
       //每个类可以拥有多个TypeConverter方法，但都必须要有返回值，可空
       @TypeConverter
       fun date2Long(date: Date): Long {
             return date.time
      }
        @TypeConverter
       fun long2Date(timestamp: Long): Date {
             return Date(timestamp)
       }
   }
```

## 据库创建实现原理

### Room数据抽象设计

我们知道Room数据库是SQLite的抽象设计。Room的架构可以分为三层：第三层是抽象接口层，这一层主要把原本SQLite的能力抽象成接口的形式。比如SupportSqliteOpenHelper这里面就定义了获取数据库对象的方法，以及数据库打
开之后的方法回调的接口。

那么它的实现在上一层的FrameworkSqliteOpenHelper，这一层就是直接依靠SQLite来实现相应的能力了。FrameworkSqliteOpenHelper在Room数据库架构中有着承上启下的作用。是Room和SQLite连接的桥梁。

除此之外，Room还定义了抽象数据库接口叫做SupportSqliteDatabase，这里面我们看到也是定义增删改查和事务提交的方法，它具体的实现也是上一层的
FrameworkSqliteDatabse。这个类自然也是直接依靠SQLiteDatabase来实现相应的能力。

可以看到，**Room实际上是通过抽象接口的形式，对数据库常用的操作做了一把适配**。那么有一天不再依靠SQLite，那么只需要替换掉这里的实现层即可。

底层接口和上层Room封装都不需要动。我们应用层也不需要动。而**Room实现层就是通过注解+编译时处理器的形式生成相应的实现**类来解放我们帮我们完成功能
的，Room整体设计是这么一个理念。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128222928.png)

### 数据库创建流程

这个流程比较简单，我就不贴代码一行行的解释了，可以对照下图，自行阅读源码：

![](https://gitee.com/jarrysong/img/raw/master/img/20201128223105.png)

## Room搭配LiveData监听数据变更自动刷新页面实现原理

**Room搭配LiveData数据懒加载**

第一次向LiveData注册Observer时触发onActive，从而触发首次数据的懒加载。数据的加载在RefreshRunnable中完成，首次加载数据时会向InvalidationTracker注
册监听表数据变更的observer，一旦表数据变更了，则会再次触发RefreshRunnable加载最新数据。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128223314.png)

**数据库数据变更监听**

增删改三种操作开始之前会向一张表中写入本次操作的表的成名，并将状态置为1，操作完成后会触发InvalidationTracker.endTranstions。进而查询出所有数据
变更了的表。

然后回调给每一个RoomTracklingLiveData再次执行refreshRunnable重新加载数据，并发送到UI层的observer刷新页面。

![](https://gitee.com/jarrysong/img/raw/master/img/20201128223647.png)

**LiveData是如何被创建出来的？**

```java
class CacheDao_Impl extends CacheDao{
      public LiveData<List<Cache>> query2() {
          final String _sql = "select * from table_cache";
          final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
          return __db.getInvalidationTracker().createLiveData(new String[]{"table_cache"}, false, new Callable<List<Cache>>() {
                public List<Cache> call(){
                   //一旦向LiveData注册第一个观察则的时候，才会触发这个回调
                   //也就是通过RoomDatabase去查询table_cache最新的数据
              }
           }
 }
```

RoomTrackingLiveData**数据加载**：

```java
class RoomTrackingLiveData extends LiveData{
      RoomTrackingLiveData(RoomDatabase database,InvalidationLiveDataContainer container,  boolean inTransaction,Callable<T> computeFunction,String[] tableNames) {
           mDatabase = database;
           mInTransaction = inTransaction;
          //在 RoomTrackingLiveData的构造函数里面做了两件事
          //首先是把上一步的Callable这个callback回调保存了下来，等待需要加载数据的时候会回调出去
          mComputeFunction = computeFunction;
          mContainer = container;
      
           //其次是构建一个observer,用以监听表数据变更的行为,此时只是创建出来，还没被注册
           //一旦onInvalidated方法被触发，则会触发mInvalidationRunnable，它进而会触发RefreshRunnable家在最新数据
           mObserver = new InvalidationTracker.Observer(tableNames) {
                      @Override
                      public void onInvalidated(@NonNull Set<String> tables) {
                             ArchTaskExecutor.getInstance().executeOnMainThread(mInvalidationRunnable);
                      }
                };
        }
   }
   
    protected void onActive() {
          super.onActive();
          mContainer.onActive(this);
          //第一次注册观察者时 就会触发这里 去加载首次数据
          getQueryExecutor().execute(mRefreshRunnable);
     }

    final Runnable mRefreshRunnable = new Runnable() {
         @WorkerThread
         @Override
         public void run() {
            //通过AtomicBoolean的CAS保证多线程同步，向InvalidationTracker注册观察者
             if (mRegisteredObserver.compareAndSet(false, true)) {
                 mDatabase.getInvalidationTracker().addWeakObserver(mObserver);
             }
             boolean computed;
             do {
                 computed = false;
                 // compute can happen only in 1 thread but no reason to lock others.
                 if (mComputing.compareAndSet(false, true)) {
                     // as long as it is invalid, keep computing.
                     try {
                         T value = null;
                         while (mInvalid.compareAndSet(true, false)) {
                             computed = true;
                             try {
                                 //这里通过前面保存下来callback会掉到CacheDao_Impl的query2方法去家在数据
                                 value = mComputeFunction.call();
                             } catch (Exception e) {
                                 throw new RuntimeException("Exception while computing database"
                                       + " live data.", e);
                             }
                         }
                         if (computed) {
                            //加载出最新数据后 发送给观察者
                             postValue(value);
                         }
                     } finally {
                         mComputing.set(false);
                     }
                 }
             } while (computed && mInvalid.get());
         }
     };
```

**表数据变更监听**

我们从下面的这端代码可以发现insert，delete，update三个操作在执行钱都不约而同的执行了__db.beginTransaction()。在操作执行后又不约而同的执行了
_db.endTransaction();

这两个方法的作用分别是向Room库的一张表中插入一条记录，记录下当前操作的表名。和查询出所有被认为数据发生变化了的表的集合。

```java
class CacheDao_Impl extends CacheDao{
     private final RoomDatabase __db;
     public CacheDao_Impl(RoomDatabase __db) {
        this.__db = __db;
     }
    @Override
     public void insert(final Cache cache) {
        __db.assertNotSuspendingTransaction();
        __db.beginTransaction();
        try {
        __insertionAdapterOfCache.insert(cache);
        __db.setTransactionSuccessful();
      } finally {
        __db.endTransaction();
      }
    }

    @Override
    public void delete(final Cache cache) {
       __db.assertNotSuspendingTransaction();
       __db.beginTransaction();
      try {
        __deletionAdapterOfCache.handle(cache);
        __db.setTransactionSuccessful();
      } finally {
        __db.endTransaction();
      }
    }

    @Override
    public void update(final Cache cache) {
      __db.assertNotSuspendingTransaction();
      __db.beginTransaction();
      try {
        __updateAdapterOfCache.handle(cache);
        __db.setTransactionSuccessful();
      } finally {
        __db.endTransaction();
      }
  }
}
```

**RoomDatabase**

在RoomDatabase的构造函数中创建了mInvalidationTracker对象，而且把beginTransaction，endTransaction事件分发过去。从而得以让InvalidationTracker实现表状态记录与表状态更新通知的能力。

```java
abstract class RoomDatabase{
      public RoomDatabase() {
        //在构造函数中构建数据库InvalidationTracker
        //用以追踪，记录数据发生变化了的表
        mInvalidationTracker = createInvalidationTracker();
        //这是个抽象方法，在子类中被实现new InvalidationTracker(this, ...,"table_cache","table_user");把数据库所有表的名称传递了过去
    }
     public void beginTransaction() {
        assertNotMainThread();
        SupportSQLiteDatabase database = mOpenHelper.getWritableDatabase();
        //进而通知InvalidationTracker去更新数据即将发生变化的表的状态
        mInvalidationTracker.syncTriggers(database);
        database.beginTransaction();
      }

     public void endTransaction() {
        mOpenHelper.getWritableDatabase().endTransaction();
        if (!inTransaction()) {
            //进而通知InvalidationTracker去查询出那些表的数被认定为发生了变化
            mInvalidationTracker.refreshVersionsAsync();
        }
    }
}
```

**InvalidationTracker实现表状态记录与状态查询**

每张表的增删改操作，都会在这个类中被记录下来，操作完成之后会查询出所有状态变更了的表记录。进而通知RoomTrackingLiveData中注册的Observer重新加载表数据，从而实现数据变更自动查询最新数据更新UI的功能。

```java
class InvalidationTracker{
   public InvalidationTracker(RoomDatabase database, ...,String... tableNames//数据库表的数组[形如table_cache,table_user]) {
             mDatabase = database;
             mObservedTableTracker = new ObservedTableTracker(tableNames.length);
        }
//InvalidationTracker在创建之初就会已知数据库所有的表
//syncTriggers方法 会去 遍历每个表是否已注册数据变更的obsever
//如果有，则开启对这个表的状态记录，就是向room_table_modification_log这张表中写入记录
//表的结构形如：       
// table_id列      invalidated列
// table_cache     1               //为1，就被认为数据生了变化, 
                                   //但table_id这列实际上记录的是表的Id(1,2,3),这里为了容易理解，写成table_name
// table_cache2    0
// table_cache3    0
//所以所谓的自动监听数据库数据变化就是这么实现的。没有什么玄乎的地方。
private void startTrackingTable(SupportSQLiteDatabase writableDb, int tableId) {
        writableDb.execSQL(
                "INSERT OR IGNORE INTO " + UPDATE_TABLE_NAME + " VALUES(" + tableId + ", 0)");
        final String tableName = mTableNames[tableId];
        StringBuilder stringBuilder = new StringBuilder();
        for (String trigger : TRIGGERS) {
            stringBuilder.setLength(0);
            stringBuilder.append("CREATE TEMP TRIGGER IF NOT EXISTS ");
            appendTriggerName(stringBuilder, tableName, trigger);
            stringBuilder.append(" AFTER ")
                    .append(trigger)
                    .append(" ON `")
                    .append(tableName)
                    .append("` BEGIN UPDATE ")
                    .append(UPDATE_TABLE_NAME)
                    .append(" SET ").append(INVALIDATED_COLUMN_NAME).append(" = 1")
                    .append(" WHERE ").append(TABLE_ID_COLUMN_NAME).append(" = ").append(tableId)
                    .append(" AND ").append(INVALIDATED_COLUMN_NAME).append(" = 0")
                    .append("; END");
            writableDb.execSQL(stringBuilder.toString());
        }
    }


   public void refreshVersionsAsync() {
        if (mPendingRefresh.compareAndSet(false, true)) {
        //通过线程池调度mRefreshRunnable任务
         mDatabase.getQueryExecutor().execute(mRefreshRunnable);
        }
    }
}
   Runnable mRefreshRunnable = new Runnable() {
        @Override
        public void run() { 
             ......
             //这里就是向room_table_modification_log表中，读取出所有invalidated列的值为1的数据。
            Set<Integer> invalidatedTableIds = checkUpdatedTable();
            if (invalidatedTableIds != null && !invalidatedTableIds.isEmpty()) {
                synchronized (mObserverMap) {
                    for (Map.Entry<Observer, ObserverWrapper> entry : mObserverMap) {
                    //这里会通过table_id找到table_name.进而通知每个RoomTrackingLiveData中注册的Observer
                    //从而实现表数据变更自动查询最新数据更新UI的能力
                        entry.getValue().notifyByTableInvalidStatus(invalidatedTableIds);
                    }
                }
            }
        }
```

## 总结
- 面试时经常会闻到你有使用Room+LiveData的组合吗？它的优势是什么？Room+LiveData组合是如何监听标数据变更自动加载最新数据刷新页面的？如果你有仔细阅读文章这两个问题的答案不言而喻了。
- 同学们在做业务架构设计的时候，如果对如何分层，每个类只应该干哪些事情拿捏不稳，可以参考Room的三层设计以及FrameworkSqliteOpenHelperd的职责