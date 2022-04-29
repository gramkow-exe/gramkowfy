import React, {useState} from 'react';
import { loadLists } from '../../services/api';
import List from "../List"
import Contexto from './contexto';
import produce from "immer";

import { Container } from './styles';
const data = loadLists();
export default function board() {
    const [Lists, SetLists] = useState(data);

    function move(fromlist, toList, from, to){
        console.log(toList)
        SetLists(produce(Lists, draft => {
            const dragged = draft[fromlist].cards[from];
            draft[fromlist].cards.splice(from, 1);
            draft[toList].cards.splice(to,0,dragged);
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

