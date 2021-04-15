import { useHost, useState, useEffect, useEvent } from "atomico";

/**
 * @template T
 * @param {string} channel
 * @returns {[T,(T)=>T]}
 */
export function useChannel(channel) {
  const host = useHost();

  const dispatch = useEvent(channel, { bubbles: true, composed: true });

  const [state, setState] = useState();

  useState(() => {
    const subs = new Set();

    /**
     * Associate a subscriber and return a callback to describe
     * @param {(value:any)=>void} callback
     */
    host.on = (callback) => subs.add(callback) && (() => subs.delete(callback));

    /**
     * Notify subs and gives them the new state
     * @param {*} state
     * @returns {void}
     */
    host.sync = (state) => [...subs].forEach((fn) => fn(state));

    // This pattern is only applicable in Atomic,
    // since the useHost reference already has the
    // association of the instance in current
    const { current } = host;

    // dispatch an event to verify if there is a connection with root
    dispatch((channel) => {
      // If it exists, this callback is executed to access host and subscribe
      host.removeOn = channel.on(setState);
    });

    /**
     * @param {CustomEvent<(host:any)=>void>} event
     */
    const listener = (event) => {
      event.stopPropagation();
      event.detail(host);
    };

    current.addEventListener(channel, listener);

    // create a callback to clean subscriptions,
    host.remove = () => {
      current.removeEventListener(channel, listener);
      host.removeOn && host.removeOn();
    };

    return;
  });

  useEffect(() => host.remove, []);

  return [state, host.sync];
}
