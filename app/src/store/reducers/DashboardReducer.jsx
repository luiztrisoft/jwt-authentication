import {
    INFO_DASHBOARD 
} from '../actions/DashboardAction';

const INITIAL_STATE = {   
    dashboardInfoV3: {
       name: 'Trisoft Front End Base',
       version: ' v.3 ',
       date: '01/03/2021',
       changes: [
           {change:'Atualização para o Primereact 6.0.2'},
           {change:'Definição do tema css saga-blue em App.jsx'},
           {change:'Estrutura de pastas do projeto'},
           {change:'Mudança no arquivo Routes.js'},
           {change:'Em AppMenu.jsx a rota /table foi modificada apra /Grid'},
           {change:'Arquivos de recursos agora estão em assets/img invés de  public'},
           {change:'Exemplo do Grid com paginação e suas propriedades'},
           {change:'Dashboard informando modificações da última versão'},
           {change:'Inclusão do applymiddleware e redux-thunk'}
       ]
    },
    dashboardInfoV2: {
        name: 'Trisoft Front End Base',
        version: ' v.2 ',
        date: '05/06/2020',
        changes: [
            {change:'Reformulação completa. Nada foi aproveitado da primeira versão'},
            {change:'Criação do template'},
            {change:'Definição dos menus'},
            {change:'Estrutura do projeto'},
            {change:'Assets TriSoft'},
            {change:'Instalação de Primereact 3.0.0, Redux, Axios e outros'},
            {change:'Definição de icones'},
            {change:'Páginas de exemplo'},
            {change:'Componente visual de botão'}           
        ]
        
     }
}

export const DashboardReducer = (state = INITIAL_STATE, action) =>{    
    switch(action.type){
        case INFO_DASHBOARD:        
        return {
            ...state,
            dashboard:{
                info: action.payload
            }
        };        
        default:
            return state;
    }
}