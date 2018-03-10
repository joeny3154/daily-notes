class A {
  static a = 1
  fun = () => {
    console.log(A.a)
  }
}
const a = new A()

a.fun()