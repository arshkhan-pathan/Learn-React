import React, { useState } from "react";

function Item({ props, removehandler }) {
  const removeHandle = (ind) => {
    removehandler(ind);
  };

  return (
    <>
      <div className="container py-5 h-100">
        <table className="table mb-4">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Todo item</th>

              <th scope="col">Actions</th>
            </tr>
          </thead>
          {props.map((el, ind) => {
            return (
              <>
                {" "}
                <tbody>
                  <tr>
                    <th scope="row">{ind + 1}</th>
                    <td className=""> {el}</td>
                    <td>
                      <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={() => {
                          removeHandle(ind);
                        }}
                      >
                        Delete
                      </button>
                      <button type="submit" className="btn btn-success ms-1">
                        Finished
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Item;
