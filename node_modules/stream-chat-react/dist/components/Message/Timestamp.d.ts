import React from 'react';
import type { TimestampFormatterOptions } from '../../i18n/types';
export interface TimestampProps extends TimestampFormatterOptions {
    customClass?: string;
    timestamp?: Date | string;
}
export declare function Timestamp(props: TimestampProps): React.JSX.Element | null;
