// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'qiyue-test-7t6yq',
})

const db = cloud.database({
  env: 'qiyue-test-7t6yq',
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