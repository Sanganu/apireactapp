import React,{useContext} from "react";

const HookUseContextC2 = () =>{
    const [displayExp]=useContext(ContextState)
    return(<> {displayExp ? <figure>
        <p>const value = useContext(MyContext);
Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.
The current context value is determined by the value prop of the nearest
{/* <MyContext.Provider> */}
  above the calling component in the tree.
            
When the nearest
{/* <MyContext.Provider> */}
  above the component updates,
 this Hook will trigger a rerender with the latest context value passed to that MyContext provider. 
 Even if an ancestor uses React.memo or shouldComponentUpdate, a rerender will still happen starting at the component itself using useContext.
                
                Don’t forget that the argument to useContext must be the context object itself:
                
                Correct: useContext(MyContext)
                Incorrect: useContext(MyContext.Consumer)
                Incorrect: useContext(MyContext.Provider)
A component calling useContext will always re-render when the context value changes.
If re-rendering the component is expensive, you can optimize it by using memoization.</p>

                <p>If you’re familiar with the context API before Hooks, useContext(MyContext) is equivalent to static contextType = MyContext in a class, or to 
                    {/* <MyContext.Consumer>. */}
                
useContext(MyContext) only lets you read the context and subscribe to its changes. You still need a 
{/* <MyContext.Provider> */}
 above in the tree to provide the value for this context.</p>
</figure>}

    </>)
}


export default HookUseContextC2;
