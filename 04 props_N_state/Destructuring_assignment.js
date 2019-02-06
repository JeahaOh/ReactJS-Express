//  비구조화 할당문.
const object = { a: 1, b: 2 };

//  const a = object.a;
//  const b = object.b;

const {a, b} = object;
console.log(a);
console.log(b);


function print( { name, age } ) {
    console.log( name + "의 나이는 " + age );
}

print( { name: 'react', age: '몰라' } );

//  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment