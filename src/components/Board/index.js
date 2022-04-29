import React, {useState} from 'react';
import { loadLists } from '../../services/api';
import List from "../List"
import Contexto from './contexto';
import produce from "immer";

import { Container } from './styles';
const data = loadLists(); //Carrega as listas do arquivo js disponibilizado no video
export default function board() {
    const [Lists, SetLists] = useState(data); //erro de hook

    function move(fromlist, toList, from, to){ //move os cards por um meio de "rascunhos" criados com o produce
        console.log(toList)
        SetLists(produce(Lists, draft => { //trasnforma comandos em um setState aceitavel
            const dragged = draft[fromlist].cards[from];
            draft[fromlist].cards.splice(from, 1);
            draft[toList].cards.splice(to,0,dragged);//leva o objeto movido a lista
        }))
        
    }
    return (
        <Contexto.Provider value={{Lists, move}}>
            <Container>
                {Lists.map((list, index) => <List index={index} key={list.title} data={list}/>)}
            </Container>
        </Contexto.Provider>
    );
    }

