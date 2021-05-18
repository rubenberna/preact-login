import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks';
import { Accordion } from "../common/Accordion/Accordion";
import { AddAccountForm } from './AddAccountForm';

export const AddAccount = ({addAccount, connectedAccounts}) => {
  const [isOpen, setOpen] = useState(true)

  useEffect(() => {
    if (!connectedAccounts.length) {
      setOpen(true)
    }
  }, [connectedAccounts])

  const props = {
    title: 'Add Volvo Financial Services Accounts',
    body: <AddAccountForm addAccount={addAccount} closeForm={() => setOpen(false)} />,
    isOpen,
    toggleOpen: (boolean) => setOpen(boolean),
    collapsible: false
  }
  return (
    <Accordion {...props} />
  )
}