// const db = wx.cloud.database({
//   env: "qiyue-0haeb"
// }); // 初始化数据库
const dbTest = wx.cloud.database({
  env: "qiyue-test-7t6yq"
});



Page({

  /**
   * 页面的初始数据
   */
  data: {

    images: []

  },

  onInsertData: function() {
    // dbTest.collection("user").add({
    //   data: {
    //     name: "Park",
    //     age: 25,
    //   },
    //   success: res => { //箭头函数
    //     console.log(res);
    //   },
    //   fail: error => { //箭头函数
    //     console.log(error);
    //   }
    // });

    dbTest.collection("user")
      .add({
        data: {
          name: "Jack",
          age: 20,
        },
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  },

  onUpdateData: function() {
    dbTest.collection("user").doc("08560c9e5d0856f50374b1bc44965516")
      .update({
        data: {
          age: 18
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  },

  onSearchData: function() {
    dbTest.collection("user")
      .where({
        name: "Jack"
      }).get()
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  },

  onDeleteData: function() {
    dbTest.collection("user").doc("3b07eb945d085acb0375a44c25d13d8f")
      .remove()
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  },


  onClickSum: function() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 9,
        b: 3,
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },

  onGetOpenId: function() {
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },

  onBatchDelete: function() {
    wx.cloud.callFunction({
      name: 'batchDelete',
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  },

  onUploadPic: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + ".png", // 云端路径
          filePath: tempFilePaths[0], // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          dbTest.collection("image")
            .add({
              data: {
                fileID: res.fileID,
              },
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
        }).catch(error => {
          // handle error
        })
      }
    })
  },

  onGetFile: function() {
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      dbTest.collection("image").where({
        _openid: res.result.openid
      }).get().then(resDb => {
        this.setData({
          images: resDb.data
        })

      })

    }).catch(err => {
      console.log(err);
    });
  },

  onDownloadFile: function(event) {
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid
    }).then(res => {
      console.log(res.tempFilePath)
      wx.getSetting({
        success: resSetting => {
          if (!resSetting.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(resSave) {
                    wx.showToast({
                      title: '保存成功',
                    })
                  }
                })
              },
              fail(err) {
                console.error(err)
                wx.showModal({
                  title: '授权提示',
                  content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
                })
              }
            })
          } else {
            // 保存图片到手机相册
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(resSave) {
                wx.showToast({
                  title: '保存成功',
                })
              }
            })
          }
        }
      })
    }).catch(error => {
      // handle error
    })
  },

  saveImage: function(path) {
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success(resSave) {
        wx.showToast({
          title: '保存成功',
        })
      }
    })
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