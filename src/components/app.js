import { h } from 'preact';
import "preact/debug";
import { useState } from 'preact/compat';
import { Header } from "./Header/Header";
import { AddAccount } from "./AddAccount/AddAccount";
import { ConnectedAccounts } from "./ConnectedAccounts/ConnectedAccounts";

const App = () => {
	const [connectedAccounts, setConnectedAccounts] = useState([])

	const addAccount = (formItems) => {
		const allAccounts = [...connectedAccounts, formItems]
		setConnectedAccounts(allAccounts)
	}

	const removeAccount = (id) => {
		const filteredAccounts = connectedAccounts.filter(acc => acc.id !== id)
		setConnectedAccounts(filteredAccounts)
	}

	return (
		<div id="app">
			<Header />
			<ConnectedAccounts connectedAccounts={connectedAccounts} removeAccount={removeAccount} />
			<AddAccount addAccount={addAccount} connectedAccounts={connectedAccounts} />
		</div>
	)
}

export default App;
