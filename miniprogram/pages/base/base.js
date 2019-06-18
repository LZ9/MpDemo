Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "基础",
    img: "/images/code-func-sum.png",
    pokemons: ["妙蛙花", "喷火龙", "水箭龟"],
    students: [{
      name: "Jack",
      age: 20
    }, {
      name: "Park",
      age: 21
    }],
    isLogin: true,
    count: 0,
  },

  onClickItem: function() {
    this.setData({
      count: this.data.count + 1
    })
  },

  onClickBox: function(event) {
    console.log("click box");
    console.log(event);
    console.log(event.target.dataset.id);
  },

  onClickChild: function() {
    console.log("click child");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})