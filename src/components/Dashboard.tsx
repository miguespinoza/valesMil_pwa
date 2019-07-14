import React, {useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import { balanceRequested } from "../actions";

type Props = {

}

const Dashboard: React.FC<Props> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(balanceRequested({cardId: "6273181142637946", password: "Zl38#U2E!"}))
  }, [dispatch])

  const balance = useSelector((state: any)=> state.balance["6273181142637946"])
  const isLoading = useSelector((state: any)=> state.isLoading["6273181142637946"])

  return (
    <div>
      {isLoading && "is Loading..."}
      {balance}
    </div>
  );
}

export default Dashboard;