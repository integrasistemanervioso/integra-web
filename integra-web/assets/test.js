(function(){
  var WA='https://wa.me/5492604419242?text=';
  var Q=[
    {k:'que',q:'¿Qué te pasa con tu bebé?',o:[
      ['calma','Llora mucho, le cuesta calmarse o dormir, lo siento incómodo o tenso'],
      ['neuro','Quiero saber si su desarrollo está bien y potenciarlo'],
      ['cabeza','Tiene la cabecita con forma rara, no del todo redondita, o mira siempre para el mismo lado'],
      ['grupo','Quiero estar en un espacio grupal con otras familias']]},
    {k:'como',q:'¿Cómo querés que te acompañe?',o:[
      ['entender','Quiero entender qué le pasa'],
      ['sola','Quiero herramientas para manejarme sola, a mi ritmo'],
      ['mirar','Quiero que mires a mi bebé y me digas qué tiene'],
      ['manos','Quiero que lo trabajes con tus manos, en persona']]},
    {k:'cuanto',q:'¿Cómo querés empezar?',o:[
      ['simple','Con algo simple y económico'],
      ['todo','Con todo lo que necesite']]}
  ];
  var R={
    masterclass:{n:'Masterclass',b:'"No es cólico, es sistema nervioso". Para entender por qué tu bebé está así y empezar a ayudarlo hoy. Grabada, la ves cuando quieras.',p:'USD 50 · $75.000',u:'masterclass/'},
    presencia:{n:'Presencia',b:'Yo te enseño qué hacer y vos tenés las herramientas: balanceos, masajitos, contacto y cómo regularte vos. Todo grabado, a tu ritmo.',p:'USD 110 · $170.000',u:'presencia/'},
    esencial:{n:'Consulta 1:1 Esencial',b:'Todo lo de Presencia + evalúo a tu bebé y te digo qué le pasa + practicamos en vivo balanceos y masajitos.',p:'USD 290 · $440.000',u:'calma/#opciones'},
    pro:{n:'Consulta 1:1 Pro',b:'Evalúo a tu bebé, te cuento todo en una videollamada, practicamos juntas y armamos su rutina. Con seguimiento por Zoom.',p:'USD 440 · $670.000',u:'calma/#opciones'},
    plancalma:{n:'Plan Calma presencial',b:'3 días seguidos trabajando con mis manos, en San Rafael o en tu ciudad cuando viajo, para que tu bebé salga del llanto y vuelva a dormir.',p:'',u:'plan-calma/'},
    neuro:{n:'Neurodesarrollo 1:1',b:'Qué tiene que ir haciendo tu bebé según su edad, y juegos y movimientos simples para acompañarlo.',p:'Desde USD 240 · $362.400',u:'neurodesarrollo/'},
    plagio:{n:'Plan Plagiocefalia / Tortícolis',b:'Una semana trabajando con mis manos su cabecita, su cuello y su boca, en San Rafael o en tu ciudad cuando viajo.',p:'',u:'plan-plagiocefalia/'},
    criar:{n:'Criar Liviano',b:'Encuentros en vivo con otras familias para aprender a calmar a tu bebé y bajar un cambio vos también.',p:'USD 38 · $58.000 por mes',u:'criar-liviano/'}
  };
  var A={}, step=0, box=document.getElementById('qbox'); if(!box) return;
  var BASE=box.getAttribute('data-base')||''; var FROM=box.getAttribute('data-from')||'tu web';
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
  function pick(){
    if(A.que==='neuro') return 'neuro';
    if(A.que==='cabeza') return 'plagio';
    if(A.que==='grupo') return 'criar';
    if(A.como==='manos') return 'plancalma';
    if(A.como==='mirar') return A.cuanto==='todo'?'pro':'esencial';
    if(A.como==='sola') return 'presencia';
    return A.cuanto==='todo'?'presencia':'masterclass';
  }
  function label(k,v){for(var i=0;i<Q.length;i++){if(Q[i].k===k){for(var j=0;j<Q[i].o.length;j++){if(Q[i].o[j][0]===v)return Q[i].o[j][1]}}}return ''}
  function render(){
    if(step>=Q.length || (step>0 && A.que!=='calma')) return result();
    var q=Q[step];
    var h='<div class="qstep">Pregunta '+(step+1)+' de '+Q.length+'</div><p class="qq">'+q.q+'</p><div class="qopts">';
    q.o.forEach(function(o){h+='<button type="button" class="qopt" data-v="'+o[0]+'">'+esc(o[1])+'</button>'});
    h+='</div>';
    if(step>0) h+='<button type="button" class="qback" data-back="1">← Volver</button>';
    box.innerHTML=h;
  }
  function result(){
    var r=R[pick()];
    var resumen=[label('que',A.que),label('como',A.como),label('cuanto',A.cuanto)].filter(Boolean).join(' / ');
    var msg='Hola Noe! Hice el test de '+FROM+'. Mis respuestas: '+resumen+'. Me salió: '+r.n+'. ¿Me contás más?';
    var h='<div class="qres"><div class="rk">Lo que te recomiendo</div><h3>'+esc(r.n)+'</h3><p>'+esc(r.b)+'</p>';
    if(r.p) h+='<div class="rp">'+r.p+'</div>';
    h+='<div class="tbtns"><a class="tbtn" href="'+BASE+r.u+'">Ver más</a><a class="tbtn o" href="'+WA+encodeURIComponent(msg)+'" target="_blank" rel="noopener">Hablarlo conmigo</a></div>';
    if(A.cuanto==='simple' && FROM!=='la Guía Calma') h+='<div class="extra">🤍 Y si querés empezar hoy mismo, gratis: <a href="'+BASE+'guia-calma/">la Guía Calma</a>.</div>';
    h+='</div><button type="button" class="qback" data-reset="1">↺ Hacer el test de nuevo</button>';
    box.innerHTML=h;
  }
  box.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    if(b.dataset.reset){A={};step=0;return render();}
    if(b.dataset.back){step--;delete A[Q[step].k];return render();}
    A[Q[step].k]=b.dataset.v; step++; render();
  });
  render();
})();
