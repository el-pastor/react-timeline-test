export const FixedQueue = (size, initialValues) => {
    initialValues = initialValues || [];
    // Create the fixed queue array value.
    const queue = Array.apply(null, initialValues);

    queue.fixedSize = size;
    queue.unshift = FixedQueue.unshift;
    FixedQueue.trimTail.call(queue);

    return queue;
};

// I trim the queue down to the appropriate size, removing
// items from the beginning of the internal array.
FixedQueue.trimTail = function () {
    if (this.length <= this.fixedSize) {
        return;
    }
    // Trim whatever is beyond the fixed size.
    Array.prototype.splice.call(
        this,
        this.fixedSize,
        this.length - this.fixedSize
    );
};

FixedQueue.unshift = function () {
    const result = Array.prototype.unshift.apply(this, arguments);

    FixedQueue.trimTail.call(this);

    // Return the original value.
    return result;
};
