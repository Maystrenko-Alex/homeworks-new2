import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: Array<UserType> // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (
    name: string,
    setError: (error: boolean) => void,
    setName: (name: string) => void,
    addUserCallback: (name: string) => void
) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    const currentName = name.trim();
    if (currentName) {
        addUserCallback(currentName);
        setError(false)
        setName('')
    } else {
        setError(true)
    }


}

export const pureOnBlur = (name: string, setError: (error: boolean) => void) => { // если имя пустое - показать ошибку
    if (!name.trim()) {
        setError(true)
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: (name: string) => void) => { // если нажата кнопка Enter - добавить
    if (e.key === 'Enter') {
        addUser(e.currentTarget.value)
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<boolean>(false) // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
       const currentText = e.currentTarget.value;
        if (currentText) {
            setName(currentText)
            setError(false)
        } else {
            setError(true)
            setName('')
        }
         // need to fix

        // error && setError('')
    }
    const addUser = () => {
        if (name.trim()) {
            pureAddUser(name, setError, setName, addUserCallback)
        }
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: any) => {
        if (name.trim()) {
            pureOnEnter(e, addUser)
        } else {
            setError(true)
        }
    }

    const totalUsers = users.length // need to fix

    // const lastUserName = users[totalUsers] && users[totalUsers].name ;
    const lastUserName = !totalUsers ? undefined : users[totalUsers - 1].name
    // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
