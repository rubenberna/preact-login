import { h } from 'preact'
import { useState, useEffect } from "preact/hooks";
import { Accordion } from "../common/Accordion/Accordion";
import style from './connectedAccounts.css'

export const ConnectedAccounts = ({ connectedAccounts, removeAccount }) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (connectedAccounts.length) {
      setOpen(true)
    }}, [connectedAccounts])

  const ConnectedAccounts = () => {
    if (connectedAccounts.length) {
      return (
        <div>
          <div class={style.connectedHeader}>
            <span>Customer</span>
          </div>
          {connectedAccounts.map((account, idx) => (
            <div key={account.id} className={style.connectedAccounts}>
              <span>Customer {idx + 1}</span>
              <span className={style.disconnect} onClick={() => removeAccount(account.id)}>Disconnect</span>
            </div>
          ))}
        </div>
      )
    }
    return <span class={style.connectedAccountsZero}>No connected customer accounts</span>
  }

  const props = {
    title: 'Connected Customer Accounts',
    body: <ConnectedAccounts />,
    isOpen,
    toggleOpen: (boolean) => setOpen(boolean),
    collapsible: true
  }
  return (
    <Accordion {...props} />
  )
}