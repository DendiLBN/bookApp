export const LoginTestTest = () => {
  const handlerHelloWorld = () => {
    prompt("Hello world");
    console.log("Hello World!");
  };

  return (
    <div>
      <button onClick={handlerHelloWorld}>Click Me</button>
    </div>
  );
};
export default LoginTestTest;
