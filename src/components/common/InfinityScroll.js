import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { Spinner } from "components/common";

function InfinityScroll({ callNext, is_next, loading, children }) {
  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }
    const { scrollHeight } = document.body;
    const { innerHeight } = window;
    const scrollTop = document.documentElement?.scrollTop || document.body?.scrollTop;

    if (scrollHeight - scrollTop - innerHeight < 200) {
      callNext();
    }
  }, 1000);

  const handleScroll = useCallback(_handleScroll, [_handleScroll]);

  useEffect(() => {
    if (loading) return;

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading, handleScroll]);

  return (
    <>
      {children}
      {is_next && <Spinner />}
    </>
  );
}

InfinityScroll.defaultProps = {
  callNext: () => {},
  is_next: false,
  loading: false,
  children: null,
};

export default InfinityScroll;
