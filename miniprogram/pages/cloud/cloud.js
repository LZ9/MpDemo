// const db = wx.cloud.database({
//   env: "qiyue-0haeb"
// }); // 初始化数据库
const dbTest = wx.cloud.database({
  env: "qiyue-0haeb"
});



Page({

  /**
   * 页面的初始数据
   */
  data: {

    images: []

  },

  onInsertData: function() {
    dbTest.collection("club_table")
      .where({
        type: 3
      }).get()
      .then(res => {
        console.log(res);
        if (!res.data || res.data.length == 0) {
          return dbTest.collection("club_table")
            .add({
              data: {
                name: "蓝波美利达车队",
                type: 3,
              },
            })
        }
        throw Error("data is already exist")
      })
      .then(res => {
        console.log("res : ", res);
      }).catch(err => {
        console.log("catch : ", err);
      });
  },

  onUpdateData: function() {
    dbTest.collection("club_table")
      .where({
        type: 3
      }).get()
      .then(res => {
        console.log(res);
        if (!res.data || res.data.length == 0) {
          throw Error("data is empty")
        }
        var item = res.data[0]
        return dbTest.collection("club_table")
          .doc(item._id)
          .update({
            data: {
              name: "移动之星车队"
            }
          })
      })
      .then(res => {
        console.log("res : ", res);
      }).catch(err => {
        console.log("catch : ", err);
      });
  },

  onSearchData: function() {
    dbTest.collection("club_table")
      .where({
        type: 3
      }).get()
      .then(res => {
        console.log("res : ", res);
      }).catch(err => {
        console.log("catch : ", err);
      });
  },

  onDeleteData: function() {
    dbTest.collection("club_table")
      .where({
        type: 3
      }).get()
      .then(res => {
        console.log(res);
        if (!res.data || res.data.length == 0) {
          throw Error("data is empty")
        }
        var item = res.data[0]
        return dbTest.collection("club_table")
          .doc(item._id)
          .remove()
      })
      .then(res => {
        console.log("res : ", res);
      }).catch(err => {
        console.log("catch : ", err);
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
          })
          .then(res => {
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
          })
          .catch(error => {
            // handle error
          })
      }
    })
  },

  onGetFile: function() {
    wx.cloud.callFunction({
        name: 'login',
      })
      .then(res => {
        dbTest.collection("image").where({
            _openid: res.result.openid
          }).get()
          .then(resDb => {
            this.setData({
              images: resDb.data
            })

          })

      })
      .catch(err => {
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

  onPromiseSingle: function() {
    console.log("开始执行")
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello")
      }, 2000)
    }).then(res => {
      console.log(res + " World")
    }).catch(err => {
      console.log(err)
    })
  },

  onPromiseMultiple: function() {
    console.log("开始执行")
    new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Hello")
        }, 2000)
      })
      .then(res => {
        console.log(res)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("World")
          }, 2000)
        })
      })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  },

  onPromiseObj: function() {
    console.log("开始执行")
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello World")
        console.log("promise 执行完毕")
      }, 1000)
    })

    setTimeout(() => {
      promise.then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }, 3000)
  },

  onPromiseThen: function() {
    console.log("开始执行")
    new Promise((resolve, reject) => {
        console.log("STEP 1")
        setTimeout(() => {
          resolve(100)
        }, 1000)
      })
      .then(res => {
        return new Promise((resolve, reject) => {
            console.log("STEP 1-1")
            setTimeout(() => {
              resolve(110)
            }, 1000)
          })
          .then(res => {
            console.log("STEP 1-2")
            return res
          })
          .then(res => {
            console.log("STEP 1-3")
            return res
          })
      })
      .then(res => {
        console.log(res)
        console.log("STEP 2")
      })
      .catch(err => {
        console.log(err)
      })
  },

  onPromiseAll: function() {
    console.log("开始执行")
    // 组合多个Promise并等待全部执行完成
    Promise.all([1, 2, 3])
      .then(all => {
        console.log("1 : ", all)
        return Promise.all([function() {
          console.log("ooxx")
        }, "xxoo", false])
      })
      .then(all => {
        console.log("2 : ", all)
        let p1 = new Promise((resolve) => {
          setTimeout(() => {
            resolve("i am p1")
          }, 1500)
        })
        let p2 = new Promise((resolve) => {
          setTimeout(() => {
            resolve("i am p2")
          }, 1000)
        })
        return Promise.all([p1, p2])
      })
      .then(all => {
        console.log("3 : ", all)
        let p1 = new Promise((resolve) => {
          setTimeout(() => {
            resolve("i am p1")
          }, 1500)
        })
        let p2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject("i am p2")
          }, 1000)
        })
        let p3 = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject("i am p3")
          }, 3000)
        })
        return Promise.all([p1, p2, p3])
      })
      .then(res => {
        console.log("all : ", all)
      })
      .catch(err => {
        console.log("catch : ", err)
      })
  },

  onPromiseRace: function() {
    console.log("开始执行")
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("i am p1")
      }, 1500)
    })
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("i am p2")
      }, 1000)
    })
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("i am p3")
      }, 3000)
    })

    //返回最先执行完成的Promise对象
    Promise.race([p1, p2, p3])
      .then(res => {
        console.log("race : ", res)
      })
      .catch(err => {
        console.log("catch : ", err)
      })
  },

  onAsyncAwitCall: function() {
    // 需要开启增强编译
    console.log("开始执行")
    this.getTestId()
  },

  async getTestId() {
    try {
      var id = await this.getIdForPromise(15)
      console.log("id : ", id)
    } catch (e) {
      console.log(e)
    }
  },

  getIdForPromise: function(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("获取id")
        resolve(id)
      }, 3000)
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