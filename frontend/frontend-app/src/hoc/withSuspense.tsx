import React from "react";

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>){
    return (props: T) => {
        return (
            <React.Suspense fallback={<p>Loading...</p>}>
                <WrappedComponent {...props}/>
            </React.Suspense>
        );
    }
}