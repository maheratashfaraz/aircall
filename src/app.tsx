import * as React from "react"
import { getToken } from './services/getToken'
import { refreshToken } from './services/refreshToken'
import CollapsibleTable from './components/table/table'
import { Header } from './components/header/header'
import { LoadingSpinner } from './components/loadingSpinner'

export const App = () => {
    const [token, setToken] = React.useState("")
    React.useEffect(() => {
        getToken().then(res => {
            setToken(res.data.access_token)
            setTimeout(() => getFreshToken(res.data.access_token), 540000)
        }).catch(e => {
            alert('Issue with getting token')
        })
    }, [])

    //currently it returns 401 due to strict-origin-when-cross-origin (backend issue)
    const getFreshToken = (token: string) => {
        refreshToken(token).then(res => {
            setToken(res.data.access_token)
        }).catch(e => {
            alert('Issue with refreshing token')
        })
        clearTimeout();
        setTimeout(() => getFreshToken(token), 540000);
    }


    if (token) {
        return <div >
            <Header />
            <CollapsibleTable token={token} />
        </div>
    }

    return <LoadingSpinner />
};