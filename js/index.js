//回顾本地存储知识

// var todolist = [{
//   title: '今天干了什么事撒',
//   done: false
// }, {
//   title: '今天还做了什么事撒',
//   done: false
// }];

// localStorage.setItem('todo', JSON.stringify(todolist))

// var data = JSON.parse(localStorage.getItem('todo'))
// console.log(data);

$(function () {
  //利用事件对象.keyCode判断用户按下回车键（13）
  //按下回车键，把完整数据 存储到本地
  load()
  $('#title').on('keydown', function (e) {
    if (e.key === 'Enter' && $(this).val().trim('') !== '') {
      //读取本地存储数据
      var local = getDate()
      //把输入的数据传给local数组
      local.push({ title: $(this).val(), done: false })
      //把数组的最新数据存储到本地存储
      saveDate(local)
      //input 的value清空
      $(this).val('')
      //渲染
      load()
    }
  })

  //删除ing里面的li
  $('ol,ul').on('click', 'a', function () {
    //获取本地存储
    var data = getDate()
    //修改数据
    var index = $(this).attr('id')
    // console.log(index);
    data.splice(index, 1)
    // 保存到本地存储
    saveDate(data)
    //重新渲染页面 
    load()
  })

  //todolist 正在进行和已完成项目操作
  $('ol,ul').on('click', 'input', function () {
    // alert(11)
    //获取本地数据，修改数据
    var data = getDate()
    var index = $(this).siblings('a').attr('id')
    data[index].done = $(this).prop('checked')
    console.log(data);
    //再保存数据
    saveDate(data)
    //再渲染页面
    load()
  })

  //读取本地存储的数据
  function getDate() {
    var data = localStorage.getItem('todolist')
    if (data !== null) {
      return JSON.parse(data)
    } else {
      return []
    }
  }

  //存数据到本地存储
  function saveDate(data) {
    localStorage.setItem('todolist', JSON.stringify(data))
  }

  //渲染函数
  function load() {
    //读取数据
    var data = getDate()
    //遍历前先清空渲染 
    $('ol,ul').empty();
    //事件数量
    var todoCount = 0
    var doneCount = 0
    //遍历渲染
    $.each(data, function (i, ele) {
      if (ele.done) {
        $('ul').prepend('<li><input type="checkbox" name="" id="" checked="checked"><p>' + ele.title + '</p><a href="#" id="' + i + '"></a></li>')
        doneCount++
      } else {
        // 创建li，给ol追加li
        $('ol').prepend('<li><input type="checkbox" name="" id=""><p>' + ele.title + '</p><a href="#" id="' + i + '"></a></li>')
        todoCount++
      }
    })
    $('.todoCount').text(todoCount)
    $('.doneCount').text(doneCount)

  }


})