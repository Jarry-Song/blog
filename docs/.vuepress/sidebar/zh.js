module.exports = {
    '/zh/guide/': getGuideSidebar('指南', '深入'),
    //Android
    '/zh/android/basic/': getAndroidBasic(),
    '/zh/android/ui/': getAndroidUI(),
    '/zh/android/architecture/': getAndroidArchitecture(),
    '/zh/android/performance/': getAndroidPerformance(),
    '/zh/android/ndk/': getAndroidNdk(),
    '/zh/android/hybrid/': getAndroidHybrid(),
    '/zh/android/framework/': getAndroidFramework(),
    '/zh/android/jetpack/': getAndroidJetpack(),
    '/zh/android/kotlin/': getAndroidKotlin(),
    //Java
    '/zh/java/basic/': getJavaBasic(),
    '/zh/java/structures/': getJavaStructures(),
    '/zh/java/algorithms/': getJavaAlgorithms(),
    '/zh/java/exercise/': getJavaExercise(),
}


//指南
function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'use-processes',
        'common-problem'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'advance_function',
        'pay_manager'
      ]
    }
  ]
}


//Android-基础
function getAndroidBasic () {
  return [
    {
      title: '基础',
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}


//Android-UI
function getAndroidUI () {
  return [
    {
      title: '高级UI',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}

//Android-架构设计
function getAndroidArchitecture () {
  return [
    {
      title: '架构设计',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}

//Android-性能优化
function getAndroidPerformance () {
  return [
    {
      title: '性能优化',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}


//Android-NDK
function getAndroidNdk () {
  return [
    {
      title: 'NDK',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}

//Android-混合开发
function getAndroidHybrid () {
  return [
    {
      title: '混合开发',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}


//Android-开源框架
function getAndroidFramework () {
  return [
    {
      title: '开源框架',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}


//Android-Jetpack
function getAndroidJetpack () {
  return [
    {
      title: 'Jetpack',
      collapsable: false,
      children: [
        '',
        'livecycle',
        'livedata-1',
        'livedata-2',
        'viewmodel',
        'savedstate',
        'room',
        'workmanager',
        'databinding'
      ]
    }
  ]
}

//Android-Kotlin
function getAndroidKotlin () {
  return [
    {
      title: 'Jetpack',
      collapsable: false,
      children: [
        '',
        'kotlin-1-1',
        'kotlin-2',
        'kotlin-3',
        'kotlin-4',
        'kotlin-5',
        'kotlin-6',
        'kotlin-7',
        'kotlin-8',
        'kotlin-9',
        'kotlin-10',
        'kotlin-11',
        'kotlin-12'
      ]
    }
  ]
}



//Java-基础
function getJavaBasic () {
  return [
    {
      title: '基础',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}


//Java-数据结构
function getJavaStructures () {
  return [
    {
      title: 'Structures',
      collapsable: false,
      children: [
        '',
        'complexity',
        'array',
        'linked-list',
        'stack',
        'queue',
        'binary-tree',
        'binary-serch-tree',
        'AVL',
        'B-tree',
        'red-black-tree',
        'set',
        'map',
        'hashmap',
        'heap',
        'priority-queue',
        'huffman',
        'tire'
      ]
    }
  ]
}

//Java-算法
function getJavaAlgorithms () {
  return [
    {
      title: 'Algorithms',
      collapsable: false,
      children: [
        '',
        'sort',
        'union-find',
        'graph',
        'recursion',
        'backtrack',
        'greedy',
        'divide-conquer',
        'coin-change',
        'bloom-filter',
        'skip-list',
        'B-tree',
        'sequence'
      ]
    }
  ]
}

//Java-练习
function getJavaExercise () {
  return [
    {
      title: 'Exercise',
      collapsable: false,
      children: [
        '',
        'list_sort',
        'linklist',
        'stack_queue',
        'string',
        'dynamic_programming',
        'binary_tree',
        'dfs',
        'top'
      ]
    }
  ]
}



