Flux Standard Action


https://github.com/acdlite/flux-standard-action


### Actions

**An action MUST**

be a plain JavaScript object.
have a `type` property. 用户动作的唯一标识符

**An action MAY**

have an `error` property. 出错的情况下为true, 其他情况不需要提供
have a `payload` property. action相关的数据，一般来自于后端接口，用于更新store，在出错的情况下为错误对象
have a `meta` property. 可选参数，其他可能需要的额外数据，不算作payload的一部分

An action MUST NOT include properties other than `type`, `payload`, `error`, and `meta`.


- `type`

The type of an action identifies to the consumer the nature of the action that has occurred. By convention, type is usually a string constant or a Symbol. If two types are the same, they MUST be strictly equivalent (using ===).

- `payload`

The optional payload property MAY be any type of value. It represents the payload of the action. Any information about the action that is not the type or status of the action should be part of the payload field.

By convention, if error is true, the payload SHOULD be an error object. This is akin to rejecting a promise with an error object.

- `error`

The optional error property MAY be set to true if the action represents an error.

An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.

If error has any other value besides true, including undefined and null, the action MUST NOT be interpreted as an error.

- `meta`

The optional meta property MAY be any type of value. It is intended for any extra information that is not part of the payload.