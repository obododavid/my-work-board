import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createCard, deleteList } from '../store/actions';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { myState } from '../utils/utils';
import uuidv4 from 'uuid';

import Card from './Card';
import TextArea from './TextArea';
import { ListWrapper } from './ListStyles';

interface Props {
    listTitle: string,
    tasks: Array<string | number>,
    listId: string | number,
    index: number,
}

const List: React.FunctionComponent<Partial<Props>> = ({ listTitle, tasks, listId, index }) => {
    const [addTask, setAddTask] = useState(false);
    const [cardDetails, setCardDetails] = useState('');
    const dispatch = useDispatch();

    const handleAddCard = () => {
        setAddTask(!addTask);
    }

    const handleSetTaskDetails = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCardDetails(event.target.value)
    }

    const handleSubmitCard = () => {
        const cardId = uuidv4()
        dispatch(createCard(cardId, cardDetails, listId));
        handleAddCard();
    }

    const handleDeleteList = () => {
        dispatch(deleteList(listId))
    }

    const handleOnKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmitCard()
        }
    }

    const {
        allCards
    } = useSelector((state: myState) => ({
        allCards: state.cards,
    }), shallowEqual)



    return (
        <Draggable draggableId={String(listId)} index={index as number}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <ListWrapper>
                        <div className='List__title'>
                            <span className='List__title__header'>{listTitle}</span>
                            <FontAwesomeIcon icon={faPlus} onClick={handleDeleteList} />
                        </div>
                        <Droppable droppableId={String(listId)} type="card">
                            {provided => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {allCards && Object
                                        .values(allCards)
                                        .filter(task => listId === task.listId)
                                        .map(({ cardId, cardDetails }, i) => <Card key={cardId} content={cardDetails} index={i} cardId={cardId} />)}
                                    {addTask &&
                                        <TextArea
                                            handleShowTextArea={handleAddCard}
                                            handleSubmitTextArea={handleSubmitCard}
                                            handleUpdateTextArea={handleSetTaskDetails}
                                            handleOnKeyPress={handleOnKeyPress}
                                            placeholder='Enter details for this task'
                                            buttonText='Add Card' />}
                                    {provided.placeholder}
                                    <button onClick={handleAddCard} className='btn-add-task'>
                                        <FontAwesomeIcon icon={faPlus} /><span>Add another card</span>
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    </ListWrapper>
                </div>
            )}
        </Draggable>
    )
};

export default List;