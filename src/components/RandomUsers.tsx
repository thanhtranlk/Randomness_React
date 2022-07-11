import "./RandomUsers.css";
import axios, { AxiosResponse } from "axios";
import { RandomUser, User } from "@/datatypes";
import React, {
  useEffect,
  useState,
  Component,
  ChangeEvent,
  MouseEvent,
} from "react";
import { render } from "react-dom";

export default function RandomUsersComponent(): JSX.Element {
  const [userArr, setuserArr] = useState<User[]>([]);

  const [numUsers, setNumUsers] = useState(5);
  function updateNumUsers(ev: ChangeEvent<HTMLInputElement>):void{
    setNumUsers(Number (ev.target.value));}
  

  useEffect(() => {
    [moreUsers]

   // return () => {};
  },[]);

  function moreUsers(ev: MouseEvent<HTMLButtonElement>): void {
    console.log(numUsers);
    axios
      .request({
        method: "GET",
        url: "https://randomuser.me/api",
        params: {
          results: numUsers,
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: RandomUser) => {
        console.log(r.results);
        // userArr.splice(0);
        // userArr.push(...r.results);
        setuserArr(r.results);
      });
    console.log(userArr);
  }

  return (
    <>
      <h1>Random Users</h1>
      <p>
        <a href="https://randomuser.me/documentation">API documentation</a>
      </p>
      <label>Number of users</label>
      <input
        type="number"
        min="3"
        onChange={updateNumUsers}
      />
      <button onClick={moreUsers}>Fetch</button>

      {userArr.length < 0 ? (
        <p>No Table</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th colSpan={2}></th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userArr.map((u: User, pos: number) => {
              return (
                <tr key={pos}>
                  <td>{pos + 1}</td>
                  <td>
                    <img src={u.picture.thumbnail} />
                  </td>
                  <td>
                    {u.name.first} {u.name.last}
                  </td>
                  <td>{u.email}</td>
                  <td />
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
