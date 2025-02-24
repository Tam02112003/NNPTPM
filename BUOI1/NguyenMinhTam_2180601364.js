// let array = [10,9,8,7,6,5,4,3,2,1];
// array2 = array.map((e) => {
//     if (e % 2 == 0) {
//         return "Chan"; 
//     }
//     return "Le";
// });

// const XIN_CHAO = "EM CHAO ANH LONG";
// console.log(XIN_CHAO);
// console.log(a);
// console.log(b);
// var a = 10;
// let b = 20;
// console.log(cong(5,2,5,7,8,9,2,1));
// function cong()
// {
//     let sum = 0;
//     console.log(arguments);
//     for(let i = 0; i < arguments.length; i++)
//     {
//         sum += arguments[i];
//     }
//     return sum;
// }

// let score1 = "Toan";
// let score2 = "Ly";
// let student = {
//     name: "Long",
//     age: 20,
//     score: {
//         [score1]: 5,
//         [score2]: 6,
//     },
//     address: "Ha Noi",
//     phone: "0123456789"
// }

//Nguyễn Minh Tâm-2180601364
let student = function(name, age, score1, score2)
{
    this.name = name;
    this.age = age;
    this.score1 = score1;
    this.score2 = score2;
    
    this.getInfo = function(){
        return this.name + " " + this.age + " " + this.score1 + " " + this.score2 + " ";
    }
}

let student1 = new student("Long", 20, 8,9);
let student2 = new student("Nam", 15, 6,7);
let student3 = new student("Hai", 22, 7,8);
let student4 = new student("Hoa", 18, 4,5);


let students = [student1, student2, student3, student4];

// for (const student in students) {
//     // console.log(student.getInfo());
//     console.log(students[student].getInfo());
// }

// // let sumAge = students.reduce((sum, student) => {
// //     return sum += student.age/ students.length;
// // }, 0);

// // let sum = 0;
// // for (const student of students) {
// //     let age = student.age;
// //     sum += age;
// // }

// // students.reduce( function(sum,student){
// //     return sum+= student.age;    
// // },0);

// // let sumScore = students.reduce((sum, student) => {
// //     return sum += student.score/ students.length;
// // }, 0);

// // let KhongDup = students.filter(function(student) {
// //     let TBC = (student.score1 + student.score2)/2;
// //     return TBC >= 4;
// // });

// // let QuaMon =[];
// // for (const student of students) {
// //     let TBC = (student.score1 + student.score2)/2;
// //     if (TBC >= 5) {
// //         QuaMon.push(student);
// //     }
// // }

// // let check = false;
// // for (const student of students) {
// //    if(student.score1<4 || student.score2<4) {
// //        check = true;
// //        break;
// //    }
// // }

console.log("Nguyễn Minh Tâm_2180601364")


// let xepLoai = students.map(student => {
//     let TBC = (student.score1 + student.score2) / 2;
//     if (TBC >= 8) return `${student.name}: Gioi`;
//     if (TBC >= 6.5) return `${student.name}: Kha`;
//     if (TBC >= 5) return `${student.name}: Trung Binh`;
//     return `${student.name}: Yeu`;
// });
// console.log(xepLoai);

// let diemTBC = students.reduce((sum, student) => {
//     return sum + (student.score1 + student.score2) / 2;
// }, 0) / students.length;
// console.log(`TBC điểm của SV trong lớp: ${diemTBC}`);

// let SVduoi18 = students.some(student => student.age < 18);
// console.log(`Có sinh viên nào dưới 18: ${SVduoi18}`);

// let dayDuTen = students.every(student => student.name);
// console.log(`Cả lớp có đầy đủ tên: ${dayDuTen}`);


// let promise = new Promise (function(resolve,reject){
//     let rd = Math.floor(Math.random()*6)+5;
//     setTimeout(function(){
//         console.log("Da gui mail sau: "+ rd+ "giay");
//         resolve();
//     },rd*1000)
// })
// let promise2 = new Promise (function(resolve,reject){

//     setTimeout(function(){
//         resolve();
//     },1000)
// })
// let max=10000;
// let batch_size=100;

// for(let index =0 ; index<max/batch_size;index++){
//     promises=[];
//     for(let j=0; j < batch_size; j++){
//         let promise = new Promise (function(resolve,reject){
//             let rd = Math.floor(Math.random()*6)+5;
//             setTimeout(function(){
//                 console.log("Da gui mail sau: "+ rd+ "giay");
//                 resolve();
//             },rd*1000);
//         })
//         promises.push(promise)
//     }
//         Promise.race(promises).then(function(){
//         console.log("Done");
//     })
    
// }
// Promise.race([promise1,promise2]).then(function(){
//     console.log("Done");
// })


let promise1 = new Promise((resolve, reject) => {
    let rd = Math.floor(Math.random() * 11);
    setTimeout(() => {
        if (rd % 2 === 0) {
            resolve(student1); 
        } else {
            reject("dữ liệu lỗi");
        }
    }, 2000);
});


let promise2 = new Promise((resolve, reject) => {
    let rd = Math.floor(Math.random() * 11);
    setTimeout(() => {
        if (rd % 2 === 0) {
            resolve(student1); 
        } else {
            reject("dữ liệu lỗi");
        }
    }, 4000);
});


Promise.all([promise1, promise2])
    .then(results => {
        console.log("lấy dữ liệu hoàn thành");
        console.log(results);
    })
    .catch(error => {
        console.log(error);
    });


Promise.race([promise1, promise2])
    .then(result => {
        console.log("đã lấy được dữ liệu");
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });