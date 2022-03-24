import React, { useContext, useState, useEffect } from "react";

const NodeContext = React.createContext();

export function NodeProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    const getNode = async (email) => {
        const options = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },

        }

        const response = await fetch(`/node/user/${email}`, options);
        const json = await response.json();
        console.log(json);
        return json;
    }

    useEffect(() => {
        setIsLoading(false);

    });

    const value = {
        getNode
    };

    return (
        <NodeContext.Provider value={value}>
            {/* dont load children components when Context is Loading */}
            {!isLoading && children}
        </NodeContext.Provider>
    );
}

export function useNode() {
    return useContext(NodeContext);
}
