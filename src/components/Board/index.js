import React, {useState} from 'react';
import { loadLists } from '../../services/api';
import List from "../List"
import Contexto from './contexto';
import produce from "immer";

import { Container } from './styles';
const data = loadLists();
export default function board() {
    const [lists, setLists] = useState(data);

    function move(fromlist, from, to){
        setLists(produce(lists, draft => {
            const dragged = draft[fromlist].cards[from];
            draft[fromlist].cards.splice(from, 1);
            draft[fromlist].cards.splice(to,0,dragged)
        }))
        
    }
    return (
        <Contexto.Provider value={{lists, move}}>
            <Container>
                {lists.map((list, index) => <List index={index} key={list.title} data={list}/>)}
            </Container>
        </Contexto.Provider>
    );
    }

