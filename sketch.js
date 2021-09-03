const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var bunny;
var cut;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  
  var options = {
    density:0.001,
  }
  fruit = Bodies.circle(300,300,20,options);
  bunny = createSprite(250,540,10,10);
  bunny.addImage("Bunny",rabbit);
  bunny.scale = 0.2
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  cut = createImg("cut_button.png");
  cut.position(230,30);
  cut.size(35,35);
  cut.mouseClicked(drop);  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

  image(food,fruit.position.x,fruit.position.y,70,70);
  
  Engine.update(engine);
  
  ground.show();
  rope.show();
  drawSprites();
  //console.log(fruit.position.y)

}

function drop(){
rope.break()  
fruit_con.detach();
fruit_con = null;
}
