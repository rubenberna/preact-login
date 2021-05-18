import { h } from 'preact'
import { Autocomplete } from 'preact-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { useForm, FORM_KEYS } from '../../utils/form.util';
import style from './addAccount.css'

export const AddAccountForm = ({ addAccount, closeForm }) => {

  const validate = form => {
    let isValid = true
    Object.entries(form).map(([key, obj]) => {
      if (!obj.value) {
        isValid = false
        setError(key)
        if (key === FORM_KEYS.location) {
          autocompleteClassError(true)
        }
      }
    })
    return isValid
  }

  const handleSubmit = () => {
    const isValid = validate(form)
    if (isValid) {
      addAccount({...form, id: uuidv4()})
      clearForm()
      closeForm()
    }
  }

  const { form, formItems, setError, clearForm, autocompleteClassError } = useForm(handleSubmit)

  const toggleAutocomplete = () => {
    const hiddenClass = 'rj_list_hidden'
    const ref = document.getElementsByClassName('rj_list')[0]
    if (ref.classList.contains(hiddenClass)) {
      ref.classList.remove(hiddenClass)
    } else {
      ref.classList.add(hiddenClass)
    }
  }

  const renderSearchIcon = () => (
    <span class={style.autoCompleteIcon} onClick={toggleAutocomplete}>
      &#8250;
    </span>
  )

  return (
    <div class={style.addAccount}>
      <div class={style.addAccountTitle}>
        <span>Please add your Volvo Financial Services contract details to connect your account to Volvo Connect.</span>
        <span>This will enable you to view your financial information.</span>
      </div>
      <div class={style.addAccountForm}>
        { formItems.map((formItem) => {
          return (
            <div key={formItem.id} class={style.formItem}>
              <label class={style.formLabel}>{formItem.label}</label>
              { formItem.type === 'autocomplete' ?
                <Autocomplete
                  className={`${style.autocomplete} ${style.formInput} ${formItem.error ? style.error : ''}`}
                  {...formItem }
                  searchAddon={renderSearchIcon()}
                  emptyText='Unknown country' />
                :
                <input
                  class={`${style.formInput} ${formItem.error ? style.error : ''}`}
                  {...formItem} />
              }
            </div>
          )
        })}
        <button id={style.formButton} type='submit' onClick={handleSubmit}>Validate</button>
      </div>
    </div>
  )
}
