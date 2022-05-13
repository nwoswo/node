function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
  
  async function hello() {
    await wait(6000);
    return 'world';
  }

hello().then((result) => {
    console.log(result);
}).catch((err) => {
    
});