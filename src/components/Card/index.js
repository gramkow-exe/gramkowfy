import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Contexto from '../Board/contexto';
import { Container, Label } from './styles';

function Card({data, index, listIndex}) {
    const ref = useRef()
    const {move} = useContext(Contexto)

    const [{isDragging}, dragRef] = useDrag({
        type: 'CARD',
        item: {index, listindex},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor){
        const draggedListIndex = item.listIndex
        // const targetListIndex = listIndex;

        const draggedIndex = item.index;
        const targetindex = index;

        if (draggedIndex === targetindex){
            return;
        }

        const targetSize = ref.current.getBoundingClientRect()
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;

        const draggedOffset = monitor.getClientOffset();
        const draggedTop = draggedOffset.y - targetSize.top;

        if (draggedIndex < targetindex && draggedTop < targetCenter){
            return;
        }

        if (draggedIndex > targetindex && draggedTop > targetCenter){
            return;
        }

        move(draggedListIndex, draggedIndex, targetindex)
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