// ==========================================
// 1. KONFIGURASI & STATE
// ==========================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDZCnFqxHa0CGVFiipxoCAj6UUbdxkCnwwvK89e4ET2xfU4iTlmAgSgh4mF2YM2I4/exec";
const ADMIN = "6285117010280";
const MENUS = [
    {label:"Americano Ice",harga:6000},{label:"Americano Double",harga:8000},
    {label:"Coffee Milk",harga:7000},{label:"Coffee Aren",harga:8000},
    {label:"Coffee Milo",harga:10000},{label:"Coffee Honey",harga:10000},
    {label:"Coffee Latte",harga:10000},{label:"Coffee Rimba",harga:11000},
    {label:"Salted Caramel",harga:12000},{label:"Vanilla Latte",harga:12000},
    {label:"Hazelnut Latte",harga:12000},{label:"Fresh Milk",harga:8000},
    {label:"Chocolate",harga:8000},{label:"Strawberry",harga:8000},
    {label:"Manggo",harga:8000},{label:"Thaitea",harga:8000},
    {label:"Taro",harga:8000},{label:"Matcha",harga:9000},{label:"Milo",harga:9000},{label:"Gratis",harga:0},{label:"Staff",harga:0}
];

let cart = {};
let sessionOrders = [];
let expenses = []; 
let orderCounter = 0;

// ==========================================
// 2. UTILITY, PROFILE & AUTO-SAVE FUNCTIONS
// ==========================================
const now = () => new Date();
const fmtTime = (d) => d.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
const fmtDate = (d) => d.toLocaleDateString('id-ID', {day:'2-digit', month:'2-digit', year:'numeric'});
const cleanNum = (v) => parseInt((v || "").toString().replace(/[^0-9]/g, "")) || 0;

function fmtRp(el) {
    const v = el.value.replace(/[^0-9]/g, "");
    el.value = v ? "Rp " + parseInt(v).toLocaleString('id-ID') : "";
}

function hapticFeedback() {
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(20);
}

function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
        t = document.createElement('div'); t.id = 'toast';
        Object.assign(t.style, {position:'fixed', bottom:'110px', left:'50%', transform:'translateX(-50%)', background:'#1a1a1a', color:'#fff', padding:'10px 20px', borderRadius:'20px', fontSize:'13px', fontWeight:'700', zIndex:'9999', transition:'opacity .4s'});
        document.body.appendChild(t);
    }
    t.innerText = msg; t.style.opacity = '1';
    setTimeout(() => t.style.opacity = '0', 22
