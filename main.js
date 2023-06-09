let vanban = "";
let mahoa_md5 = "";
let chuky;
let banro = "";
let banma = "";
let private_key = "";
let public_key = "";
let p, q, n, e, eule, d;


function kiemtrasonguyento(so) {
    let kiemtra = true;

    if (so == 2 || so == 3) {
        return kiemtra;
    } else {
        if (so == 1 || so % 2 == 0 || so % 3 == 0) {
            kiemtra = false;
        } else {
            for (let i = 5; i <= Math.sqrt(so); i += 6) {
                if (so % i == 0 || so % (i + 2) == 0) {
                    kiemtra = false;
                    break;
                }
            }
        }
    }
    return kiemtra;
}

function nguyentocungnhau(so1, so2) {
    let ktx_ = false;

    while (so2 != 0) {
        let temp = so1 % so2;
        so1 = so2;
        so2 = temp;
    }

    if (so1 == 1) ktx_ = true;
    else ktx_ = false;

    return ktx_;
}


// Tao khoa tu dong
function taoKhoaTuDong() {
    do {
        p = Math.floor(Math.random() * 95) + 7;
        q = Math.floor(Math.random() * 86) + 15;
    } while (
        p == q ||
        !kiemtrasonguyento(p) ||
        !kiemtrasonguyento(q)
    );

    n = p * q;

    //Tính Phi(n)=(p-1)*(q-1)
    eule = (p - 1) * (q - 1);

    //Tính e là mot so ngau nhiên có giá tri 0< e <phi(n) và là so nguyên to cùng nhau voi Phi(n)
    do {
        e = Math.floor(Math.random() * (eule - 2)) + 2;
    } while (!nguyentocungnhau(e, eule));

    //Tính d = 1 mod eule
    d = 0;
    let i = 2;
    while (((1 + i * eule) % e) != 0 || d <= 0) {
        i++;
        d = (1 + i * eule) / e;
    }

    return true;
}

// Tao khoa thu cong
function taoKhoaThuCong() {
    n = p * q;
    //Tính Phi(n)=(p-1)*(q-1)
    eule = (p - 1) * (q - 1);

    //Tính e là mot so ngau nhiên có giá tri 0< e <phi(n) và là so nguyên to cùng nhau voi Phi(n)
    do {
        e = Math.floor(Math.random() * (eule - 2)) + 2;
    } while (!nguyentocungnhau(e, eule));

    //Tính d = 1 mod eule
    d = 0;
    let i = 2;
    while (((1 + i * eule) % e) != 0 || d <= 0) {
        i++;
        d = (1 + i * eule) / e;
    }

    return true;
}




function RSA_mod(mx, ex, nx) {
    let a = [];

    let k = 0;
    do {
        a[k] = ex % 2;
        k++;

        ex = Math.floor(ex / 2);
    } while (ex != 0);

    let kq = 1;

    for (let i = k - 1; i >= 0; i--) {
        kq = (kq * kq) % nx;

        if (a[i] == 1) {
            kq = (kq * mx) % nx;
        }
    }

    return kq;
}


function mahoa() {
    let k = "";

    let _n = vanban.length;

    for (let i = 0; i < _n; i++) {
        let temp = vanban.charCodeAt(i);

        k += RSA_mod(temp, e, n);

        if (i != _n - 1) k += "-";
    }

    return k;
}

function giaima() {
    let s = [];

    let count = 0;
    for (let i = 0; i < chuky.length; i++)
        if (chuky[i] == "-") count++;

    count += 1;

    let tokens = chuky.split("-");
    let i = 0;
    for (let token of tokens) {
        s[i] = parseInt(token);
        i++;
    }

    let m = "";

    for (let i = 0; i < count; i++) {
        m += String.fromCharCode(RSA_mod(s[i], d, n));
    }

    return m;
}


let tk = taoKhoaTuDong();

// var valueP = document.querySelector(".header__value-container-input-1");
// var valueQ = document.querySelector(".header__value-container-input-2");
// function checkValue() {
//     if (valueP.value == "") {
//         alert("Bạn cần nhập P");
//     }

//     if (valueQ.value == "") {
//         alert("Bạn cần nhập Q");
//     }
//     p = valueP.value;
//     q = valueQ.value;

//     if (!kiemtrasonguyento(p)) {
//         alert("P không phải số nguyên tố")
//     }

//     if (!kiemtrasonguyento(q)) {
//         alert("Q không phải số nguyên tố")
//     }
//     alert("Thỏa mãn điều kiện");
//     taoKhoaThuCong();
// }


// console.log("Khoa bi mat: ");
// console.log("\t D = " + d);
// console.log("\t N = " + n);

// console.log("Khoa cong khai: ");
// console.log("\t E = " + e);
// console.log("\t N = " + n);


function xuLiMaHoa() {
    let valueMainLeftContentIn = document.querySelector('.main__left-content-input');
    if (valueMainLeftContentIn.value == '') {
        alert('Bạn cần nhập văn bản ký');
    }
    vanban = valueMainLeftContentIn.value;
    banma = mahoa();
    let textareaMainLeftFooterInput = document.querySelector('.main__left-footer-input');
    textareaMainLeftFooterInput.value = banma;
}


function xuLiGiaiMa() {
    let valueMainRightContent1In = document.querySelector('.main__right-content-1-input');
    if (valueMainRightContent1In.value == '') {
        alert('Bạn cần nhập văn bản ký');
    }

    let valueMainRightContent2In = document.querySelector('.main__right-content-2-input');
    if (valueMainRightContent2In.value == '') {
        alert('Bạn cần nhập chữ ký');
    }
    chuky = banma;
    banro = giaima();
    var textRightValue1 = document.querySelector(".main__right-content-1-input");
    var textRightValue2 = document.querySelector(".main__right-content-2-input");
    var textLeftValue1 = document.querySelector(".main__left-content-input");
    var textLeftValue2 = document.querySelector(".main__left-footer-input");
    let textareaMainRightFooterInput = document.querySelector('.main__right-footer-input');
    if (textLeftValue1.value == textRightValue1.value && textLeftValue2.value == textRightValue2.value) {
        textareaMainRightFooterInput.value = "Chữ ký chính xác";
    } else {
        if (textLeftValue1.value != textRightValue1.value || textLeftValue2.value != textRightValue2.value) {
            textareaMainRightFooterInput.value = "Chữ ký không chính xác hoặc văn bản đã bị thay đổi";
        }
    }
}



const textareaContent = document.querySelector('.main__left-content-input');
function parseWordDocxFile(inputElement) {
    const fileNormal = inputElement.files[0];
    if (fileNormal.type === 'text/plain') {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
            const fileContent = reader.result;
            textareaContent.value = fileContent;
        });
        reader.readAsText(fileNormal);
    } else {
        var files = inputElement.files || [];
        if (!files.length) return;
        var file = files[0];

        console.time();
        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;

            mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                var textarea = document.querySelector(".main__left-content-input");
                textarea.innerHTML = resultObject.value;
                console.log(resultObject.value);
            });

            console.timeEnd();
        };
        reader.readAsArrayBuffer(file);
    }

}


function activateInput() {
    var input = document.getElementById('main__left-content-btn-sub-file');
    input.click();
}

//chuyen
function moveValue() {
    let value_1 = document.querySelector('.main__right-content-1-input');
    value_1.value = vanban;
    let value_2 = document.querySelector('.main__right-content-2-input');
    value_2.value = banma;
}



const saveBtn = document.querySelector('.main__left-footer-btn-save');
const textarea = document.querySelector('.main__left-footer-input');

saveBtn.addEventListener('click', () => {
    const textareaValue = textarea.value;

    // Tạo đối tượng blob chứa giá trị để tải về
    const blob = new Blob([textareaValue], { type: 'text/plain' });

    // Tạo đối tượng link để tải xuống
    const url = window.URL.createObjectURL(blob);

    // Tạo đối tượng anchor để thực hiện tải về
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.txt');

    // Thêm anchor vào DOM và click
    document.body.appendChild(link);
    link.click();

    // Xóa đối tượng anchor và URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
});





function activateInput2() {
    var input = document.getElementById('main__right-content-btn-sub-file-1');
    input.click();
}


const textareaContentRight = document.querySelector('.main__right-content-1-input');
function parseWordDocxFile2(inputElement) {
    const fileNormal = inputElement.files[0];
    if (fileNormal.type === 'text/plain') {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
            const fileContent = reader.result;
            textareaContentRight.value = fileContent;
        });

        reader.readAsText(fileNormal);
    } else {

        var files = inputElement.files || [];
        if (!files.length) return;
        var file = files[0];

        console.time();
        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;

            mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                var textarea = document.querySelector(".main__right-content-1-input");
                textarea.innerHTML = resultObject.value;
                console.log(resultObject.value);
            });

            console.timeEnd();
        };
        reader.readAsArrayBuffer(file);
    }

}




function activateInput3() {
    var input = document.getElementById('main__right-content-btn-sub-file-2');
    input.click();
}


const textareaContentRight2 = document.querySelector('.main__right-content-2-input');
function parseWordDocxFile3(inputElement) {
    const fileNormal = inputElement.files[0];
    if (fileNormal.type === 'text/plain') {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
            const fileContent = reader.result;
            textareaContentRight2.value = fileContent;
        });

        reader.readAsText(fileNormal);
    } else {

        var files = inputElement.files || [];
        if (!files.length) return;
        var file = files[0];

        console.time();
        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;

            mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                var textarea = document.querySelector(".main__right-content-2-input");
                textarea.innerHTML = resultObject.value;
                console.log(resultObject.value);
            });

            console.timeEnd();
        };
        reader.readAsArrayBuffer(file);
    }

}
