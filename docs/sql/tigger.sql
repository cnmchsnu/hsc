CREATE OR REPLACE FUNCTION public.touch_row()

RETURNS TRIGGER

LANGUAGE PLPGSQL

AS $$

BEGIN

    NEW.updated_at := NOW();

    NEW.version := OLD.version + 1;

    RETURN NEW;

END;

$$;

CREATE TRIGGER touch_sku

BEFORE UPDATE

ON commerce.skus

FOR EACH ROW

EXECUTE FUNCTION public.touch_row();


CREATE TRIGGER touch_inventory_items

BEFORE UPDATE

ON inventory.inventory_items

FOR EACH ROW

EXECUTE FUNCTION public.touch_row();

CREATE TRIGGER touch_prices

BEFORE UPDATE

ON pricing.prices

FOR EACH ROW

EXECUTE FUNCTION public.tou
ch_row();


CREATE TRIGGER touch_variant_options
BEFORE UPDATE
ON commerce.variant_options
FOR EACH ROW
EXECUTE FUNCTION public.touch_row();


CREATE TRIGGER touch_variant_option_values
BEFORE UPDATE
ON commerce.variant_option_values
FOR EACH ROW
EXECUTE FUNCTION public.touch_row();



CREATE OR REPLACE FUNCTION commerce.validate_sku_variant_value()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    target_option_id UUID;
BEGIN

    SELECT option_id
    INTO target_option_id
    FROM commerce.variant_option_values
    WHERE id = NEW.option_value_id;

    IF target_option_id IS NULL THEN
        RAISE EXCEPTION
            'Variant option value % does not exist.',
            NEW.option_value_id;
    END IF;

    IF EXISTS (
        SELECT 1
        FROM commerce.sku_variant_values sv
        INNER JOIN commerce.variant_option_values ov
            ON ov.id = sv.option_value_id
        WHERE
            sv.sku_id = NEW.sku_id
            AND ov.option_id = target_option_id
            AND sv.option_value_id <> NEW.option_value_id
    ) THEN
        RAISE EXCEPTION
            'SKU % already contains a value for variant option %.',
            NEW.sku_id,
            target_option_id;
    END IF;

    RETURN NEW;

END;
$$;


DROP TRIGGER IF EXISTS trg_validate_sku_variant_value
ON commerce.sku_variant_values;

CREATE TRIGGER trg_validate_sku_variant_value
BEFORE INSERT OR UPDATE
ON commerce.sku_variant_values
FOR EACH ROW
EXECUTE FUNCTION commerce.validate_sku_variant_value();
