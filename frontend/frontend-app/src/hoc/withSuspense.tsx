import React from "react";
import Fetch from "../components/Fetch/Fetch";

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>){
    return (props: T) => {
        return (
            <React.Suspense fallback={<Fetch/>}>
                <WrappedComponent {...props}/>
            </React.Suspense>
        );
    }
}