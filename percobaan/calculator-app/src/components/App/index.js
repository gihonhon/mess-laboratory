import React, { useState } from 'react'
import Button from '../buttons'
import decimal from '../utilitis/decimal'
import './App.css'


const App = () => {
    const [value, setValue] = useState('0')
    const num = parseFloat(value)
    const[memory, setMemory] = useState(null)
    const[operator, setOperator] = useState(null)

    const buttonPress = props => () => {
        if(props === 'AC') {
            setValue('0')
            setMemory(null)
            setOperator(null)
            return
        }

        if(props === '+/-') {
            setValue((num * -1).toString())
                return
        }

        if(props === '%') {
            setValue((num/100).toString())
            setMemory(null)
            setOperator(null)
            return
        }

        if(props === '+') {
            if(operator !== null) {
                if(operator === '+') {
                    setMemory(memory + parseFloat(value))
                } else if(operator === '-') {
                    setMemory(memory - parseFloat(value))
                } else if(operator === '×') {
                    setMemory(memory * parseFloat(value))
                } else if(operator === '÷') {
                    setMemory(memory / parseFloat(value))
                } 
            } else {
                setMemory(parseFloat(value))
            }
            setValue('0')
            setOperator('+')
            return
        }

        if(props === '-') {
            if(operator !== null) {
                if(operator === '+') {
                    setMemory(memory + parseFloat(value))
                } else if(operator === '-') {
                    setMemory(memory - parseFloat(value))
                } else if(operator === '×') {
                    setMemory(memory * parseFloat(value))
                } else if(operator === '÷') {
                    setMemory(memory / parseFloat(value))
                } 
            } else {
                    setMemory(parseFloat(value))
                }
            setValue('0')
            setOperator('-')
            return
        }

        if(props === '×') {
            if(operator !== null) {
                if(operator === '+') {
                    setMemory(memory + parseFloat(value))
                } else if(operator === '-') {
                    setMemory(memory - parseFloat(value))
                } else if(operator === '×') {
                    setMemory(memory * parseFloat(value))
                } else if(operator === '÷') {
                    setMemory(memory / parseFloat(value))
                } 
            } else {
                    setMemory(parseFloat(value))
                }
            setValue('0')
            setOperator('×')
            return
        }

        if(props === '÷') {
            if(operator !== null) {
                if(operator === '+') {
                    setMemory(memory + parseFloat(value))
                } else if(operator === '-') {
                    setMemory(memory - parseFloat(value))
                } else if(operator === '×') {
                    setMemory(memory * parseFloat(value))
                } else if(operator === '÷') {
                    setMemory(memory / parseFloat(value))
                } 
            } else {
                    setMemory(parseFloat(value))
                }
            setValue('0')
            setOperator('÷')
            return
        }

        if(props === '=') {
            if(!operator) {
                return
            }

            if(operator === '+') {
                setValue((memory + parseFloat(value)).toString())
            } else if(operator === '-') {
                setValue((memory - parseFloat(value)).toString())
            } else if(operator === '×') {
                setValue((memory * parseFloat(value)).toString())
            } else if(operator === '÷') {
                setValue((memory / parseFloat(value)).toString())
            }

            setMemory(null)
            setOperator(null)
            return
        }

        if(props === '.') {
            if(value.includes('.')) {
                return
            }
        setValue(value + '.')
        return
        }

        if(value[value.length - 1] === '.') {
            setValue(value + props)
        } else {
            setValue( (parseFloat(num + props)).toString())
        }

        
    }

    return <div className='App'>
        <div className='top'></div> {/* Notif Bar or Top Bar Phone */}
        <div className='display'>{decimal(value)}</div>
        < div className='buttons'>
            <Button onButtonClick={buttonPress} props='AC'type='function'/>
            <Button onButtonClick={buttonPress} props='+/-'type='function'/>
            <Button onButtonClick={buttonPress} props='%'type='function'/>
            <Button onButtonClick={buttonPress} props='÷'type='operator'/>
            <Button onButtonClick={buttonPress} props='7'/>
            <Button onButtonClick={buttonPress} props='8'/>
            <Button onButtonClick={buttonPress} props='9'/>
            <Button onButtonClick={buttonPress} props='×'type='operator'/>
            <Button onButtonClick={buttonPress} props='4'/>
            <Button onButtonClick={buttonPress} props='5'/>
            <Button onButtonClick={buttonPress} props='6'/>
            <Button onButtonClick={buttonPress} props='-'type='operator'/>
            <Button onButtonClick={buttonPress} props='1'/>
            <Button onButtonClick={buttonPress} props='2'/>
            <Button onButtonClick={buttonPress} props='3'/>
            <Button onButtonClick={buttonPress} props='+'type='operator'/>
            <Button onButtonClick={buttonPress} props='0'/>
            <Button onButtonClick={buttonPress} props='.'/>
            <Button onButtonClick={buttonPress} props='='type='operator'/>
        </div>

    </div>
}

export default App