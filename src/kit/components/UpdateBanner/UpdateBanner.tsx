import React, { useEffect, useMemo, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

export const UpdateBanner: React.FC = () => {
  const [isShown, setIsShown] = useState(false);

  const updateSW = useMemo(
    () =>
      registerSW({
        onNeedRefresh: () => {
          setIsShown(true);
        },
      }),
    [],
  );

  useEffect(() => {
    if (!isShown) {
      return;
    }

    if (!confirm('Update is installed. Refresh?')) {
      return;
    }

    updateSW(true);
  }, [isShown]);

  if (!isShown) {
    return null;
  }

  return (
    <div>
      <div>Update is installed. Refresh?</div>
      <button onClick={() => updateSW(true)}>YES</button>
      <button onClick={() => setIsShown(false)}>NO</button>
    </div>
  );
};
