# Input Counter
Adds configurable characters counter for text fields and RichEditors.
![demo](https://user-images.githubusercontent.com/16371551/37961518-c9f25c90-31b8-11e8-803b-6b8ec1527d83.gif)

The counter supports a "min/max" range, as well as an "optimal" range. The counter background will turn yellow outside the optimal range, and red outside the min/max range.

For text fields, configuration is done using the `attributes` array. For RichEditors, use the `editorOptions` array (only available since October 3.6).

## Available properties
+ `data-counter` / `counterEnabled` (required)
+ `data-min-length` / `counterMinLength`
+ `data-max-length` / `counterMaxLenght`
+ `data-optimal-min-length` / `counterOptimalMinLength`
+ `data-optimal-max-length` / `counterOptimalMaxLength`

## Example usage

### From yaml
```yaml
fields:
    # ...

    my_text_field:
        label: My Field
        type: text
        attributes:
            data-counter: true
            data-max-length: 50

    my_rich_editor:
        label: My RichEditor
        type: richeditor
        editorOptions:
            counterEnabled: true
            counterMaxLength: 200

    # ...
```

### From a plugin
```php
public function boot()
{
    Event::listen('backend.form.extendFieldsBefore', function (Backend\Widgets\Form $form) {
        $form->tabs['fields']['viewBag[meta_title]'] += [
            'attributes' => [
                'data-counter',
                'data-optimal-min-length' => 50,
                'data-optimal-max-length' => 60,
            ]
        ];
    }
}
```


## Author
inetis is a webdesign agency in Vufflens-la-Ville, Switzerland. We love coding and creating powerful apps and sites  [see our website](https://inetis.ch).
