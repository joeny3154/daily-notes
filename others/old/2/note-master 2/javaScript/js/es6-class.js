function Student (name){
  this.name = name;
}
Student.prototype.hello = function(){
  console.log('hello, '+ this.name +'!');
}

// class 是小写

console.log("class=========================")
 class Student_ {
   constructor(name){
     this.name = name;
   }
   // 不需要 function
   hello() {
     console.log('Hello, '+ this.name +"!");
   }
 }
 var xiaoming = new Student_("小明");
xiaoming.hello();


console.log("class继承=========================");
//用class定义对象的另一个巨大的好处是继承更方便了

class SubStudent extends Student_ {
  constructor(name,grade){
    super(name);//用super调用父类的构造方法!
    this.grade = grade;
  }
  getGrade(){
    console.log("I am at grade" + this.grade);
  }
}
var xiaohua = new SubStudent("小花",18);
xiaohua.getGrade();


//ES6引入的class和原有的JavaScript原型继承有什么区别呢？实际上它们没有任何区别，class的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。简而言之，用class的好处就是极大地简化了原型链代码。


//如果一定要现在就用上，就需要一个工具把class代码转换为传统的prototype代码，可以试试Babel这个工具。

//Babel : https://babeljs.io/
