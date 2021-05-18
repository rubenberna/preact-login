import { useReducer, useRef, useEffect } from 'preact/compat';
import countriesList from '../data/countries.json'
import style from '../components/AddAccount/addAccount.css';

export const TYPES = {
  setItem: 'SET_ITEM',
  clear: 'CLEAR'
}

export const FORM_KEYS = {
  location: 'location',
  companyVat: 'companyVat',
  vfsCustomerNumber: 'vfsCustomerNumber',
  vfsInvoiceNumber: 'vfsInvoiceNumber',
}

export const initialState = {
  [FORM_KEYS.location]: {
    value: undefined,
    error: false
  },
  [FORM_KEYS.companyVat]: {
    value: undefined,
    error: false
  },
  [FORM_KEYS.vfsCustomerNumber]: {
    value: undefined,
    error: false
  },
  [FORM_KEYS.vfsInvoiceNumber]: {
    value: undefined,
    error: false
  }
}

export function formReducer(state, action) {
  switch (action.type) {
    case TYPES.setItem:
      return {...state, ...action.payload }
    case TYPES.clear:
      return initialState;
    default:
      return state
  }
}

export const useForm = (handleSubmit) => {
 const [form, dispatch] = useReducer(formReducer, initialState)

  const autocompleteClassError = (boolean) => {
    const ref = document.getElementsByClassName(style.autocomplete)[0]
    if (boolean) {
      ref.classList.add(style.error)
    } else {
      ref.classList.remove(style.error)
    }
  }

  const focusNext = targetElement => {
    const target = document.getElementById(targetElement)
    if (target.tagName === 'BUTTON') {
      handleSubmit()
    } else {
      target.focus()
    }
  }

  const handleKeyDown = (e, nextTarget) => {
    if (e.key === 'Enter') {
      focusNext(nextTarget)
    }
  }

  const formItems = [
    {
      id: FORM_KEYS.location,
      label: 'your location',
      type: 'autocomplete',
      placeholder: 'Country',
      value: form[FORM_KEYS.location].value,
      error: form[FORM_KEYS.location].error,
      data: countriesList,
      onChange: (value) => {
        autocompleteClassError(false)
        focusNext(FORM_KEYS.companyVat)
        dispatch({
          type: TYPES.setItem,
          payload: {
            [FORM_KEYS.location]: {
              value: countriesList[value].name,
              error: false
            }}
        })
      },
    },{
      id: FORM_KEYS.companyVat,
      label: 'company vat number (last 5 digits)',
      type: 'number',
      placeholder: 'XXXXX',
      value: form[FORM_KEYS.companyVat].value,
      error: form[FORM_KEYS.companyVat].error,
      onKeyDown: (e) => handleKeyDown(e, FORM_KEYS.vfsCustomerNumber),
      onInput: (e) => {
        dispatch({
          type: TYPES.setItem,
          payload: {
            [FORM_KEYS.companyVat]: {
              value: e.target.value.substr(0, 5),
              error: false
            }}
        })
      }
    },{
      id: FORM_KEYS.vfsCustomerNumber,
      label: 'vfs customer number (found on invoice)',
      type: 'text',
      placeholder: 'XXXXXXXXX',
      value: form[FORM_KEYS.vfsCustomerNumber].value,
      error: form[FORM_KEYS.vfsCustomerNumber].error,
      onKeyDown: (e) => handleKeyDown(e, FORM_KEYS.vfsInvoiceNumber),
      onInput: (e) => {
        dispatch({
          type: TYPES.setItem,
          payload: {
            [FORM_KEYS.vfsCustomerNumber]: {
              value: e.target.value.trim(),
              error: false
            }}
        })
      }
    },{
      id: FORM_KEYS.vfsInvoiceNumber,
      label: 'vfs invoice number (found on invoice)',
      type: 'text',
      placeholder: 'XXXXXXXXX',
      value: form[FORM_KEYS.vfsInvoiceNumber].value,
      error: form[FORM_KEYS.vfsInvoiceNumber].error,
      onKeyDown: (e) => handleKeyDown(e, style.formButton),
      onInput: (e) => {
        dispatch({
          type: TYPES.setItem,
          payload: {
            [FORM_KEYS.vfsInvoiceNumber]: {
              value: e.target.value.trim(),
              error: false
            }}
        })
      }
    }
  ]

  const setError = (key) => {
    dispatch({
      type: TYPES.setItem,
      payload: {
        [key]: {
          value: form[key].value, error: true
        }}
    })
  }

  const clearForm = () => {
    document.getElementsByClassName('rj_autocomplete')[0].value = ''
    formItems.forEach(item => {
      const ref = document.getElementById(item.id)
      if (ref) ref.value = ''
    })
    dispatch({
      type: TYPES.clear
    })
  }

  return {
    form,
    formItems,
    setError,
    clearForm,
    autocompleteClassError,
    dispatch
  }
}

export const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

