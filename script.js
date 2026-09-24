// FREE STATIC BOOKING SETUP
// Edit AVAILABLE_SLOTS to control what appears on the public calendar.
// Keep this file private if you do not want visitors to see future availability before publishing.
const AVAILABLE_SLOTS = [
  // Example: "2026-10-05 09:00", "2026-10-05 09:30"
];
const email = "nickpaulteaching@gmail.com";

function initBooking(){
 const cal=document.getElementById('calendar'); if(!cal)return;
 let view=new Date(); view.setDate(1);
 function render(){
  cal.innerHTML=''; const y=view.getFullYear(), m=view.getMonth();
  const bar=document.createElement('div'); bar.className='monthbar';
  const prev=document.createElement('button'); prev.textContent='←'; prev.onclick=()=>{view.setMonth(m-1);render()};
  const next=document.createElement('button'); next.textContent='→'; next.onclick=()=>{view.setMonth(m+1);render()};
  const title=document.createElement('strong'); title.textContent=view.toLocaleString('en-GB',{month:'long',year:'numeric'});
  bar.append(prev,title,next); cal.append(bar);
  const days=document.createElement('div'); days.className='days';
  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d=>{let x=document.createElement('div');x.className='dayhead';x.textContent=d;days.append(x)});
  const first=(new Date(y,m,1).getDay()+6)%7, count=new Date(y,m+1,0).getDate();
  for(let i=0;i<first;i++){days.append(document.createElement('div'))}
  for(let d=1;d<=count;d++){
   const cell=document.createElement('div'); cell.className='day'; const num=document.createElement('div'); num.className='daynum'; num.textContent=d; cell.append(num);
   const prefix=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
   AVAILABLE_SLOTS.filter(s=>s.startsWith(prefix)).forEach(s=>{
    const time=s.split(' ')[1]; const b=document.createElement('button'); b.className='slot'; b.textContent=time+' — request'; b.onclick=()=>requestSlot(s); cell.append(b);
   }); days.append(cell);
  } cal.append(days);
 }
 function requestSlot(slot){
  const name=prompt('Your name:'); if(!name)return; const from=prompt('Your email address:'); if(!from)return;
  const goal=prompt('What would you like to improve? (optional)')||'';
  const subject=encodeURIComponent('English coaching booking request — '+slot);
  const body=encodeURIComponent(`Name: ${name}\nEmail: ${from}\nRequested slot: ${slot}\nGoal: ${goal}\n\nPlease confirm availability and payment details.`);
  window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;
 }
 render();
}
document.addEventListener('DOMContentLoaded',initBooking);
