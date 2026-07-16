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

