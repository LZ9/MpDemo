// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'qiyue-0haeb',
})

const db = cloud.database({
  env: 'qiyue-0haeb',
})

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return await db.collection("user").where({
      name: "Jack"
    }).remove();
  } catch (e) {
    console.error(e);
  }
}