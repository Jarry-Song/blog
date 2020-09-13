module.exports = {
    '/zh/guide/': getGuideSidebar('指南', '深入'),
    //Android
    '/zh/android/basic': getAndoridBasic(),
    '/zh/android/ui': getAndoridUI(),
    '/zh/android/architecture': getAndoridArchitecture(),
    '/zh/android/performance': getAndoridPerformance(),
    '/zh/android/ndk': getAndoridNdk(),
    '/zh/android/hybrid': getAndoridHybrid(),
    '/zh/android/framework': getAndoridFramework(),
    //Java
    '/zh/java/basic/': getJavaAndroidBasic(),
    '/zh/java/structures/': getJavaStructures(),
    '/zh/java/algorithms/': getJavaAlgorithms(),
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
function getAndoridBasic () {
  return [
    {
      title: '基础',
      collapsable: false,
      children: [
        '',
        'object'
      ]
    }
  ]
}


//Android-UI
function getAndoridUI () {
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
function getAndoridArchitecture () {
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
function getAndoridPerformance () {
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
function getAndoridNdk () {
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
function getAndoridHybrid () {
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
function getAndoridFramework () {
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


//Java-基础
function getJavaAndroidBasic () {
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
        'stack',
        'queue',
        'binary-tree',
        'binary-serch-tree'
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
        'graph'
      ]
    }
  ]
}



