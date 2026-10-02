// Regras do jogo NR 33 • Trabalhador autorizado (espaços confinados), no mesmo padrão dos demais jogos da série.
// A operação é a limpeza interna do tanque T-02 de uma estação de tratamento.
// Cada etapa traz as referências normativas em "refs". O campo "kind" diz de onde vem o conteúdo:
//  vigente → NR 33 em vigor (Portaria SEPRT 1.690/2022, vigente desde 03/10/2022) e outras NR citadas.
//  pratica → boa prática técnica, que não é item de NR.
// "check:true" marca item ou anexo que deve ser conferido no texto consolidado antes de usar em treinamento.
// "atm" é a leitura do detector a partir da etapa; "inside" é quantas pessoas estão dentro e "pet" é a situação da permissão,
// ambos depois de concluída a etapa ("insideNow" e "petNow" valem durante a etapa).
// "fx" liga e desliga objetos do cenário quando a etapa é concluída; "during" mostra objetos só durante a etapa.
import {spots} from './layout.mjs';
export const KINDS = {
 vigente:'Em vigor',
 pratica:'Boa prática — não é item de NR'
};
const nr33=item=>({norm:'NR 33',item,kind:'vigente'});
const anexo=(n,item,check=false)=>({norm:`NR 33 • Anexo ${n}`,item,kind:'vigente',...(check?{check:true}:{})});
const nr=(norm,item,check=false)=>({norm,item,kind:'vigente',...(check?{check:true}:{})});
const pratica=(norm,item)=>({norm,item,kind:'pratica'});
const at=(p,r)=>({x:p.x,z:p.z,r});
// Parâmetros de atmosfera aceitável usados no painel do jogo.
export const LIMITS = {o2min:19.5,o2max:23,lie:10,h2s:8,co:39};
const RUIM={o2:17.8,lie:4,h2s:22,co:6},BOA={o2:20.8,lie:0,h2s:1,co:2},ALARME={o2:20.1,lie:2,h2s:14,co:4},IPVS={o2:18.9,lie:3,h2s:60,co:5};
// ---------------- Trabalhador autorizado (16 h) ----------------
const trabalhador = [
 {id:'capacitacao',refs:[nr33('33.6.2'),anexo('III','Quadro 1: trabalhador autorizado, 16 h inicial e 8 h a cada 12 meses',true),nr33('33.5.19.2')],...at(spots.board,2),
  title:'Confira a sua capacitação',description:'Você vai entrar no tanque T-02 para a limpeza. No quadro de treinamento, confira o que precisa estar em dia.',
  tip:'O trabalhador autorizado faz capacitação inicial de 16 horas e periódica de 8 horas a cada 12 meses. A aptidão para espaço confinado consta do ASO (33.5.19.2).',
  choices:[
   {id:'dezesseis',correct:true,label:'Capacitação de 16 horas, a periódica de 8 horas feita há menos de 12 meses e o ASO com aptidão para espaço confinado.',feedback:'Capacitação e aptidão em dia.'},
   {id:'integracao',label:'A integração de segurança da empresa já cobre espaço confinado.',feedback:'A integração geral não substitui a capacitação específica de 16 horas.'},
   {id:'vencido',label:'O curso de três anos atrás continua valendo.',feedback:'A capacitação periódica é a cada 12 meses.'}
  ]},
 {id:'sinalizacao',refs:[nr33('33.5.13'),anexo('I','sinalização obrigatória'),nr33('33.7.1 a)')],...at(spots.placa,1.7),
  title:'Leia a sinalização',description:'Na frente do tanque há a placa do Anexo I. A boca de visita está aberta e a PET ainda não foi emitida.',
  tip:'A sinalização permanente fica junto à entrada de todo espaço confinado (33.5.13). É proibido entrar sem autorização prévia (33.7.1 a), mesmo com a tampa aberta.',
  choices:[
   {id:'aguardar',correct:true,label:'Não entrar nem colocar a cabeça para dentro: espaço confinado só com PET emitida. Aguardar o supervisor.',feedback:'Tampa aberta não é autorização. Até a cabeça na boca de visita é entrada.'},
   {id:'olhar',label:'Colocar a cabeça para dentro, só para ver como está o lodo.',feedback:'O gás acumulado sai justamente pela boca de visita. Isso já é exposição.'},
   {id:'adiantar',label:'Entrar para adiantar o serviço enquanto a PET não sai.',feedback:'Entrar sem autorização prévia é proibido (33.7.1 a).'}
  ]},
 {id:'riscos',who:'Marcos',refs:[nr33('33.5.10'),nr33('33.3.1 f)'),nr33('33.2.2.1')],
  title:'Conheça os perigos do tanque',description:'Marcos reúne a equipe e explica os perigos do T-02. Ele pergunta qual é o mais traiçoeiro.',
  tip:'Os trabalhadores são informados dos perigos e das medidas de prevenção antes da entrada (33.5.10). Atmosfera perigosa é a que tem falta ou excesso de oxigênio, contaminantes ou risco de explosão (33.2.2.1).',
  choices:[
   {id:'invisivel',correct:true,label:'A atmosfera: falta de oxigênio não tem cheiro nem aviso, e o gás sulfídrico em concentração alta paralisa o olfato. Só o detector mostra.',feedback:'O perigo que não se vê nem se sente é o que mais mata.'},
   {id:'escuro',label:'O escuro: com uma boa lanterna, o resto se resolve.',feedback:'Iluminação ajuda, mas o que mata em tanque é a atmosfera.'},
   {id:'cheiro',label:'Nenhum: se o cheiro ficar forte, é só sair.',feedback:'O cheiro some justamente quando a concentração fica perigosa.'}
  ]},
 {id:'pet',petNow:'emitida',pet:'emitida',atm:BOA,fx:{show:['pet']},refs:[nr33('33.3.5 a)'),nr33('33.5.6'),nr33('33.7.1 b)')],...at(spots.mesaPet,1.7),
  title:'Confira a PET',description:'Marcos emitiu a PET. Antes de assinar, confira o que ela diz. Veja a leitura da atmosfera no painel.',
  tip:'O trabalhador cumpre os procedimentos previstos na PET (33.3.5 a). Ela traz o serviço, os perigos, as medidas, a avaliação atmosférica e a relação das pessoas (33.5.6). Sem avaliação atmosférica e monitoramento contínuo, a entrada é proibida (33.7.1 b).',
  choices:[
   {id:'conferir',correct:true,label:'Ler a PET: meu nome está relacionado, as leituras da atmosfera estão registradas e aceitáveis, o vigia está definido e as medidas batem com o que vejo no local.',feedback:'PET lida e conferida com a realidade antes de assinar.'},
   {id:'assinar',label:'Assinar sem ler: o supervisor sabe o que faz.',feedback:'A PET é o seu roteiro de segurança. Assinar sem ler é entrar sem saber as condições.'},
   {id:'semleitura',label:'Aceitar a PET sem as leituras: medem depois que eu entrar.',feedback:'Sem avaliação atmosférica antes, a entrada é proibida (33.7.1 b).'}
  ]},
 {id:'bloqueio',fx:{show:['meuCadeado']},refs:[nr33('33.5.14.2'),nr33('33.5.14.3'),nr33('33.5.14.1')],...at(spots.painel,1.6),
  title:'Coloque o seu cadeado',description:'O agitador do tanque já está desligado, com o cadeado do supervisor. Agora é a sua vez no painel.',
  tip:'O bloqueio garante um dispositivo individual e independente para cada trabalhador (33.5.14.2). Quem não é autorizado não remove nem substitui bloqueio (33.5.14.3).',
  choices:[
   {id:'meu',correct:true,label:'Colocar o meu cadeado e a minha etiqueta no agitador e na válvula, ficar com a chave e conferir que o agitador não parte.',feedback:'Bloqueio individual: só você tira o seu cadeado.'},
   {id:'confiar',label:'Dispensar: o cadeado do supervisor já está lá.',feedback:'Cada trabalhador tem o próprio dispositivo (33.5.14.2). Se o dele sair, o seu continua protegendo você.'},
   {id:'chave',label:'Colocar o cadeado e deixar a chave com o operador, para o caso de precisar.',feedback:'A chave fica com quem está exposto. Entregá-la anula o bloqueio.'}
  ]},
 {id:'equipamento',refs:[nr33('33.3.5 b)'),nr33('33.5.17.1'),nr33('33.5.4')],...at(spots.bancada,1.8),
  title:'Prepare o equipamento',description:'Na bancada, separe o que vai usar dentro do tanque.',
  tip:'O trabalhador utiliza adequadamente os meios e equipamentos fornecidos (33.3.5 b). Em áreas classificadas, equipamentos elétricos e eletrônicos são certificados (33.5.17.1). A proteção respiratória segue o procedimento (33.5.4).',
  choices:[
   {id:'completo',correct:true,label:'Cinto tipo paraquedista para ligar ao cabo do guincho, detector pessoal, lanterna e rádio certificados para a área, e o respirador indicado na PET, inspecionados.',feedback:'Equipamento da PET, inspecionado e adequado à área.'},
   {id:'celular',label:'Levar o celular comum como lanterna e para ouvir música.',feedback:'Aparelho comum não é certificado para área classificada e pode ser fonte de ignição. E música tira a atenção do alarme.'},
   {id:'semcinto',label:'Dispensar o cinto: atrapalha o movimento e a saída é perto.',feedback:'O cinto ligado ao guincho é o que permite tirar você de lá sem ninguém entrar.'}
  ]},
 {id:'entrada',who:'Elaine',inside:2,refs:[nr33('33.3.4 c)'),nr33('33.3.5 a)'),nr33('33.7.1 c)')],
  title:'Combine com a vigia e entre',description:'Elaine é a vigia. Antes de entrar, acerte com ela a comunicação.',
  tip:'A vigia fica junto à entrada, em contato permanente com quem está dentro (33.3.4 c). Sem vigia, não há entrada (33.7.1 c). Combine os sinais, a frequência das chamadas e o sinal de abandono.',
  choices:[
   {id:'combinar',correct:true,label:'Combinar o canal do rádio, as chamadas em intervalos curtos e o sinal de abandono, registrar a entrada no quadro e ligar o cinto ao cabo do guincho.',feedback:'Comunicação combinada, entrada registrada e cabo conectado. Pode entrar.'},
   {id:'direto',label:'Entrar direto: a vigia já está ali.',feedback:'Sem combinar sinais, a ordem de abandono pode não ser entendida.'},
   {id:'sem',label:'Entrar enquanto a vigia foi buscar água.',feedback:'Sem vigia no posto, a entrada é proibida (33.7.1 c).'}
  ]},
 {id:'dentro',refs:[nr33('33.5.15.3'),nr33('33.5.16.2'),nr33('33.5.1'),nr33('33.3.5 a)')],...at(spots.dentro,1.5),
  title:'Trabalhe dentro do tanque',description:'Entre pela boca de visita. Lá dentro, um parafuso emperrado do raspador não sai. Bento sugere buscar a esmerilhadeira.',
  tip:'A atmosfera é monitorada o tempo todo (33.5.15.3), com a ventilação ligada (33.5.16.2). Trabalho a quente, como esmerilhar, cortar e soldar, exige medidas contra incêndio e explosão (33.5.1) e precisa estar previsto na PET.',
  choices:[
   {id:'pet',correct:true,label:'Não: esmerilhar é trabalho a quente e não está na PET. Avisar a vigia; o supervisor avalia e, se for o caso, emite a permissão com as medidas.',feedback:'Serviço fora da PET não se faz. Quem decide é o supervisor.'},
   {id:'faisca',label:'Buscar a esmerilhadeira: é um parafuso só.',feedback:'Faísca em tanque com resíduo orgânico pode inflamar gases. E não está na PET.'},
   {id:'duto',label:'Tirar o duto de ventilação do caminho, que atrapalha, e seguir sem ele.',feedback:'A ventilação é o que mantém a atmosfera aceitável.'}
  ]},
 {id:'sintoma',atm:{o2:20.3,lie:1,h2s:6,co:3},refs:[nr33('33.3.5 c)'),nr33('33.3.4 f)')],...at(spots.fundo,1.4),
  title:'Você não está bem',description:'No fundo do tanque, ao remexer o lodo, você sente dor de cabeça e tontura. O detector ainda não alarmou.',
  tip:'O trabalhador comunica ao vigia ou ao supervisor as situações de risco de que tiver conhecimento (33.3.5 c). Sintoma e queixa são motivos para o vigia ordenar o abandono (33.3.4 f).',
  choices:[
   {id:'avisar',correct:true,label:'Parar, avisar a vigia pelo rádio do sintoma e sair agora, junto com o Bento.',feedback:'Sintoma comunicado e saída imediata: você não espera o alarme.'},
   {id:'aguentar',label:'Aguentar mais um pouco, porque o detector não alarmou.',feedback:'O corpo pode avisar antes do aparelho. Tontura em espaço confinado é sinal para sair.'},
   {id:'respirar',label:'Respirar fundo para ver se passa.',feedback:'Respirar fundo em atmosfera contaminada só aumenta a dose.'}
  ]},
 {id:'abandono',atm:ALARME,inside:1,during:['alarme','gas'],refs:[nr33('33.3.4 f)'),nr33('33.3.5 a)')],...at(spots.dentro,1.5),
  title:'Ordem de abandono',description:'O alarme dispara e a vigia ordena o abandono. Você está a caminho da saída. Bento diz que vai “só terminar de encher o balde”.',
  tip:'A ordem de abandono do vigia é para cumprir na hora (33.3.4 f). O trabalhador segue os procedimentos da PET e as orientações do treinamento (33.3.5 a). Ferramenta e material ficam.',
  choices:[
   {id:'sair',correct:true,label:'Sair imediatamente, deixando as ferramentas, chamar o Bento para sair junto e confirmar a saída com a vigia.',feedback:'Abandono cumprido na hora. Você está fora.'},
   {id:'terminar',label:'Ajudar o Bento a terminar o balde, para saírem juntos.',feedback:'Cada segundo a mais é dose a mais. O abandono é imediato.'},
   {id:'ferramenta',label:'Recolher todas as ferramentas antes de sair.',feedback:'Ferramenta se busca depois, com nova PET.'}
  ]},
 {id:'colega',atm:IPVS,inside:0,pet:'cancelada',during:['alarme','gas'],refs:[nr33('33.5.17.2'),nr33('33.3.4 d)'),nr33('33.3.6 a)')],...at(spots.entrada,1.8),
  title:'Bento caiu lá dentro',description:'Você está fora. Pela boca de visita, vê o Bento caído perto da saída. A vigia já acionou a equipe de emergência.',
  tip:'Em atmosfera IPVS só se entra com máscara autônoma de demanda com pressão positiva ou respirador de linha de ar com cilindro auxiliar (33.5.17.2). O salvamento é da equipe de emergência (33.3.6 a). Quem entra sem proteção vira a segunda vítima.',
  choices:[
   {id:'fora',correct:true,label:'Não voltar: ajudar a vigia de fora, no guincho, dizer à equipe de emergência onde o Bento está e manter a ventilação ligada.',feedback:'Você ajudou sem entrar. Bento saiu pelo guincho e foi atendido.'},
   {id:'voltar',label:'Voltar correndo para arrastar o Bento: você conhece o caminho.',feedback:'A atmosfera que derrubou o Bento derruba você em segundos.'},
   {id:'folego',label:'Entrar prendendo a respiração.',feedback:'Ninguém arrasta um adulto prendendo o fôlego. No esforço, você respira e cai.'}
  ]},
 {id:'fim',atm:BOA,petNow:'emitida',pet:'encerrada',fx:{show:['fechado'],hide:['pet','duto','meuCadeado','cadeados','sinalProv']},refs:[nr33('33.5.14.3'),nr33('33.3.4 b)'),nr33('33.5.11')],...at(spots.painel,1.6),
  title:'Retire o seu cadeado',description:'Dias depois, com nova PET, a limpeza foi concluída. Todos saíram e a contagem está em zero. Feche a sua parte no painel.',
  tip:'A PET é encerrada com o serviço concluído e todos fora (33.5.11). O bloqueio só é removido por quem está autorizado (33.5.14.3): cada um retira o próprio cadeado.',
  choices:[
   {id:'retirar',correct:true,label:'Confirmar com a vigia que saí, conferir que não ficou ferramenta dentro e retirar eu mesmo o meu cadeado e a minha etiqueta.',feedback:'Saída confirmada e bloqueio retirado por quem o colocou.'},
   {id:'colega',label:'Pedir a um colega que tire o meu cadeado, porque já fui para o vestiário.',feedback:'Só você tira o seu cadeado. É a garantia de que ninguém religa nada com você dentro.'},
   {id:'deixar',label:'Deixar o cadeado no painel até a semana que vem.',feedback:'Bloqueio esquecido impede a operação e perde o sentido. Retire ao sair.'}
  ]}
];
export const MODULES = {
 trabalhador:{id:'trabalhador',name:'Trabalhador autorizado',short:'TRABALHADOR',course:'Capacitação de 16 h',horas:16,periodica:8,role:'Trabalhador autorizado',place:'TANQUE T-02 • ENTRADA E TRABALHO',on:['sinalProv','cadeados','duto'],
  intro:'Você é o trabalhador autorizado que vai entrar no tanque T-02. Confira a PET, coloque o seu cadeado, combine com a vigia, entre, perceba os sinais e saia na hora certa.',
  summary:'Você respeitou a sinalização, conferiu a PET, colocou o seu bloqueio, combinou com a vigia, recusou serviço fora da PET, comunicou o sintoma, cumpriu o abandono e não voltou para socorrer sem proteção.',objectives:trabalhador}
};
export const MODULE_IDS = Object.keys(MODULES);
export const objectivesOf = m => MODULES[m].objectives;
export const indexOf = (m,id) => objectivesOf(m).findIndex(o => o.id === id);
export const refLabel = r => `${r.norm} • ${/^\d/.test(r.item)?'item ':''}${r.item}`;
// Linha de referência mostrada no painel. A origem (em vigor ou boa prática) sempre aparece.
export const refSummary = o => o.refs.map(r => ({label:refLabel(r),kind:r.kind,status:KINDS[r.kind],check:!!r.check}));

// ---------------- Capacitação (Anexo III, Quadro 1) ----------------
export const CAPACITACAO = {supervisor:{inicial:40,periodica:8,meses:12},vigia:{inicial:16,periodica:8,meses:12},trabalhador:{inicial:16,periodica:8,meses:12}};

// ---------------- Estado do jogo ----------------
export const initialState = (module=MODULE_IDS[0]) => ({module,step:0,feedback:'',errors:0,completed:[],finished:false});
export const done = (s,id) => s.completed.includes(id);
export const currentTarget = s => objectivesOf(s.module)[s.step];
function advance(s,next,id){
 const list=objectivesOf(s.module);next.completed=[...s.completed,id];next.step=s.step+1;next.finished=next.step===list.length;
 return next;
}
export function answer(s,choiceId){
 const o=currentTarget(s);const c=o?.choices?.find(x=>x.id===choiceId);if(!c)return s;
 if(!c.correct)return {...s,errors:s.errors+1,feedback:c.feedback};
 return advance(s,{...s,feedback:c.feedback},o.id);
}
export function interact(s,id){
 const o=currentTarget(s);if(!o||o.id!==id)return s;
 if(o.choices)return {...s,feedback:'Escolha uma das opções.'};
 return advance(s,{...s,feedback:''},id);
}
// Valor de um campo que acompanha o andamento: "inside" e "pet" valem depois que a etapa é concluída;
// "insideNow", "petNow" e "atm" valem enquanto a etapa é a atual (e "atm" segue valendo depois).
function carried(s,key,initial){
 const list=objectivesOf(s.module);let v=initial;
 for(let i=0;i<Math.min(s.step,list.length);i++)if(list[i][key]!==undefined)v=list[i][key];
 const cur=list[s.step];if(cur&&cur[key+'Now']!==undefined)v=cur[key+'Now'];
 return v;
}
// Leitura do detector (null = ainda não avaliada), pessoas dentro do espaço e situação da PET.
export function atmosphereOf(s){const list=objectivesOf(s.module),last=Math.min(s.step,list.length-1);let v=MODULES[s.module].atm0??null;for(let i=0;i<=last;i++)if(list[i].atm!==undefined)v=list[i].atm;return v;}
export const insideOf = s => carried(s,'inside',0);
export const petOf = s => carried(s,'pet',MODULES[s.module].pet0??'nao');
export const PET_LABEL = {nao:'PET não emitida',emitida:'PET emitida',cancelada:'PET cancelada',encerrada:'PET encerrada'};
export function atmosphereStatus(a){
 if(!a)return {ok:false,o2:null,lie:null,h2s:null,co:null,label:'Atmosfera não avaliada'};
 const st={o2:a.o2>=LIMITS.o2min&&a.o2<=LIMITS.o2max,lie:a.lie<LIMITS.lie,h2s:a.h2s<=LIMITS.h2s,co:a.co<=LIMITS.co};
 const ok=st.o2&&st.lie&&st.h2s&&st.co;return {ok,...st,label:ok?'Atmosfera aceitável':'Atmosfera perigosa • não entrar'};
}
// Objetos do cenário visíveis: começa pelos do módulo ("on"), aplica o "fx" das etapas concluídas e o "during" da etapa atual.
export function visibleItems(s,defaults={}){
 const v={...defaults};for(const k of MODULES[s.module].on||[])v[k]=true;
 for(const o of objectivesOf(s.module)){if(!done(s,o.id)||!o.fx)continue;for(const k of o.fx.show||[])v[k]=true;for(const k of o.fx.hide||[])v[k]=false;}
 const cur=currentTarget(s);
 for(const o of objectivesOf(s.module))for(const k of o.during||[])v[k]=false;
 for(const k of cur?.during||[])v[k]=true;
 return v;
}
// Áreas caminháveis: o pátio da estação; estruturas entram como obstáculos {x,z,w,d}.
export function canMove(x,z,obstacles,bounds){
 if(bounds&&!(x>bounds.minX&&x<bounds.maxX&&z>bounds.minZ&&z<bounds.maxZ))return false;
 return !obstacles.some(o=>Math.abs(x-o.x)<o.w/2+.32&&Math.abs(z-o.z)<o.d/2+.32);
}
