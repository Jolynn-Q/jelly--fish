

// Create connection to Node.JS Server
const socket = io();
let myModel;

let canvas;
let roll = 0;
let pitch = 0;
let yaw = 0;
function preload() {
  // 在 preload 函数中加载模型文件
  myModel = loadModel('./sea3.obj', true);
}

function setup() {
  createCanvas(1000, 1500, WEBGL); // 创建一个 WebGL 画布
  strokeWeight(0.2); // 设置边线粗细

  createEasyCam();

}

function draw() {

  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  background(200);
  rotateY(frameCount * 0.02); // 仅围绕 Y 轴旋转
  ambientLight(255); // 添加环境光
  scale(2.2); // 调整模型大小
  model(myModel); // 渲染模型

  // 绘制第二个模型
  push();
  translate(100, 0, 0); // 将第二个模型向右平移 200 个单位
  rotateY(frameCount * 0.06); // 沿 Y 轴反向自转
  ambientLight(255); // 添加环境光
  scale(1); // 调整模型大小
  model(myModel); // 渲染模型
  pop();

  // 绘制第三个模型
  push();
  translate(200, 0, 0); // 将第二个模型向右平移 200 个单位
  rotateY(frameCount * -0.03); // 沿 Y 轴反向自转
  ambientLight(255); // 添加环境光
  scale(1); // 调整模型大小
  model(myModel); // 渲染模型
  pop();

  // 绘制第4个模型
  push();
  translate(-100, 0, 0); // 将第二个模型向右平移 200 个单位
  rotateY(frameCount * 0.05); // 沿 Y 轴反向自转
  ambientLight(255); // 添加环境光
  scale(1); // 调整模型大小
  model(myModel); // 渲染模型
  pop();

}

//process the incoming OSC message and use them for our sketch
function unpackOSC(message) {

  /*-------------

  This sketch is set up to work with the gryosc app on the apple store.
  Use either the gyro OR the rrate to see the two different behaviors
  TASK: 
  Change the gyro address to whatever OSC app you are using to send data via OSC
  ---------------*/

  //maps phone rotation directly 
  // if(message.address == "/gyrosc/gyro"){
  //   roll = message.args[0]; 
  //   pitch = message.args[1];
  //   yaw = message.args[2];
  // }

  //uses the rotation rate to keep rotating in a certain direction
  if (message.address == "/gyrosc/rrate") {
    roll += map(message.args[0], -3, 3, -0.1, 0.1);
    pitch += map(message.args[1], -3, 3, -0.1, 0.1);
    yaw += map(message.args[2], -3, 3, -0.1, 0.1);
  }
}

//Events we are listening for
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

// Callback function to recieve message from Node.JS
socket.on("message", (_message) => {

  console.log(_message);

  unpackOSC(_message);

});