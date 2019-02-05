function a() {
    var a = 'hello';
    if( true ) {
        var a = 'bye';
        console.log('if scope 안 a: ' + a); //  bye
    }
    console.log('if scope 밖 a: ' + a);     //  bye
}

function b() {
    let b = 'hello';
    if( true ) {
        let b = 'bye';
        console.log('if scope 안 b: ' + b); //  bye
    }
    console.log('if scope 밖 b: ' + b);     //  hello
}

function c() {
    const c = 'hello';
    if( true ) {
        const c = 'bye';
        console.log('if scope 안 c: ' + c); //  bye
    }
    console.log('if scope 밖 c: ' + c);     //  hello
}

/**
    var : ES6이후 사용 지양.
    let : 유동적인 값.
    const: 한번 선언 후 고정적인 값.
 */