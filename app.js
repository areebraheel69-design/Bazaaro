const products=[
 {id:1,name:'Mini Wireless Speaker',cat:'Electronics',price:1499,old:1999,emoji:'🔊',badge:'-25%'},
 {id:2,name:'Classic Everyday Sneakers',cat:'Fashion',price:2499,old:3299,emoji:'👟',badge:'HOT'},
 {id:3,name:'Smart LED Desk Lamp',cat:'Home',price:1899,old:2499,emoji:'💡',badge:'NEW'},
 {id:4,name:'Premium Watch',cat:'Accessories',price:2199,old:2999,emoji:'⌚',badge:'-27%'},
 {id:5,name:'Self Care Essentials Kit',cat:'Beauty',price:1699,old:2299,emoji:'🧴',badge:'SALE'},
 {id:6,name:'Magnetic Phone Holder',cat:'Electronics',price:899,old:1299,emoji:'📱',badge:'VALUE'},
 {id:7,name:'Minimal Tote Bag',cat:'Fashion',price:1199,old:1599,emoji:'👜',badge:'TRENDING'},
 {id:8,name:'Kitchen Organizer Set',cat:'Home',price:1299,old:1799,emoji:'🧺',badge:'SMART PICK'}
];
const WHATSAPP='923364388227';
let cart=[];
const money=n=>'PKR '+n.toLocaleString('en-PK');
function renderProducts(filter='All'){
 const list=filter==='All'?products:products.filter(p=>p.cat===filter);
 document.querySelector('#products').innerHTML=list.map(p=>`<article class="product"><div class="product-img"><span class="badge">${p.badge}</span>${p.emoji}</div><div class="product-body"><div class="product-cat">${p.cat}</div><h3>${p.name}</h3><div><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div><button class="add" data-id="${p.id}">+ Add to Cart</button></div></article>`).join('');
 document.querySelectorAll('.add').forEach(b=>b.onclick=()=>addToCart(+b.dataset.id));
}
function addToCart(id){const p=products.find(x=>x.id===id);const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});renderCart();openCart()}
function renderCart(){
 document.querySelector('#cartCount').textContent=cart.reduce((a,x)=>a+x.qty,0);
 const el=document.querySelector('#cartItems');
 el.innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div class="emoji">${x.emoji}</div><div><h4>${x.name} × ${x.qty}</h4><p>${money(x.price*x.qty)}</p></div></div>`).join(''):'<p style="color:#65736b;font-size:13px;text-align:center;margin-top:50px">Your cart is empty.<br><br>Add a smart pick to get started 🛍️</p>';
 document.querySelector('#cartTotal').textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
}
function openCart(){document.querySelector('#cartDrawer').classList.add('open');document.querySelector('#overlay').style.display='block'}
function closeCart(){document.querySelector('#cartDrawer').classList.remove('open');document.querySelector('#overlay').style.display='none'}
function doSearch(){const q=document.querySelector('#searchInput').value.toLowerCase().trim();const r=products.filter(p=>(p.name+' '+p.cat).toLowerCase().includes(q));document.querySelector('#searchResults').innerHTML=q?(r.length?r.map(p=>`<div class="result">${p.emoji} <b>${p.name}</b> — ${money(p.price)}</div>`).join(''):'<div class="result">No smart picks found.</div>'):''}
function orderOnWhatsApp(){
 if(!cart.length){alert('Your cart is empty.');return}
 const lines=cart.map(x=>`• ${x.name} × ${x.qty} — ${money(x.price*x.qty)}`).join('\n');
 const total=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
 const message=`Assalam-o-Alaikum Bazaaro! 🇵🇰\n\nI want to place an order:\n${lines}\n\nTotal: ${total}\n\nName:\nAddress:\nCity:\nPhone:`;
 window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,'_blank');
}
renderProducts();renderCart();
document.querySelectorAll('.category').forEach(b=>b.onclick=()=>{document.querySelectorAll('.category').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.cat);document.querySelector('#deals').scrollIntoView({behavior:'smooth'})});
document.querySelector('#cartBtn').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;document.querySelector('#overlay').onclick=closeCart;
document.querySelector('#searchBtn').onclick=()=>{document.querySelector('#searchModal').classList.add('open');document.querySelector('#searchInput').focus()};document.querySelector('#closeSearch').onclick=()=>document.querySelector('#searchModal').classList.remove('open');document.querySelector('#searchInput').oninput=doSearch;
document.querySelector('#checkoutBtn').onclick=orderOnWhatsApp;
document.querySelector('.menu-btn').onclick=()=>document.querySelector('.navlinks').style.display=document.querySelector('.navlinks').style.display==='flex'?'none':'flex';
