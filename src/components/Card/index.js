import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Contexto from '../Board/contexto';
import { Container, Label } from './styles';

function Card({data, index, listIndex}) {
    const ref = useRef() //starta a referencia
    const {move} = useContext(Contexto) //passa um contexto para a função move 
                                        //recebida pelo atributo provider 

    const [{isDragging}, dragRef] = useDrag({ //func que possibilita o drag
        type: 'CARD',
        item: {index, listIndex}, //estrutura do item passado a funcao (card)
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

const [, dropRef] = useDrop({ //func que permite o drop
    accept: "CARD",
    hover(item, monitor){ //funcao chamada quando um item sobrepoem outro
        const draggedListIndex = item.listIndex
        const targetListIndex = listIndex;

        const draggedIndex = item.index;
        const targetindex = index;
        

        if (draggedIndex === targetindex && draggedListIndex === targetListIndex){
            return;
        }

        const targetSize = ref.current.getBoundingClientRect() //recebe tamanho do objeto
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;

        const draggedOffset = monitor.getClientOffset(); //recebe distancia do objeto para com a tela
        const draggedTop = draggedOffset.y - targetSize.top;

        if (draggedIndex < targetindex && draggedTop < targetCenter){
            return;
        }//retornar nulo caso esteja passando para o mesmo lugar

        if (draggedIndex > targetindex && draggedTop > targetCenter){
            return;
        }//retornar nulo caso esteja passando por baixo de um item acima de si

        move(draggedListIndex, targetListIndex, draggedIndex, targetindex)
        //chamada da função move

        item.index = targetindex;//mudança de index
        item.listIndex = targetListIndex;//mudança de lista
    }
})

dragRef(dropRef(ref))
  return(
      <Container isDragging={isDragging}  ref={ref}>
          <header>
              {data.labels.map(label => <Label key={label} color={label}></Label>)}
          </header>
        <p>{data.content}</p>
        <img alt='avatar' src={data.user ? data.user : "https://images.vexels.com/media/users/3/152593/isolated/preview/d6368d8155eb832733a200df87f48e92-icone-de-ponto-de-interrogacao-do-circulo-roxo.png"}/>
      </Container>
  );
}

export default Card;